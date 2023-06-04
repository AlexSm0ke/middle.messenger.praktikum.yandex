import { IChatMessage, TActiveChat, TChatItem } from "../../types";
import { WSS_PATH } from "../../utils/constants";
import { ChatController } from "../controllers/chatController";
import { WebSocketController } from "../controllers/webSocketController";
import { store } from "../store";

const PING_INTERVAL = 6000;

export const getDifference = (array1: any, array2: any, value: string) =>
	array1.filter((object1: any) => !array2.some((object2: any) => object1[value] === object2[value])
	);

export class WebSocketTransport {
	private socket: WebSocket;

	private content_offset = 0;

	private wsRequestInterval;

	constructor(userId: number, chatId: number, token: string, data?: Record<string, any>) {
		this.socket = new WebSocket(`${WSS_PATH}/${userId}/${chatId}/${token}`);

		this.socket.addEventListener("open", () => {
			console.info("Соединение установлено");

			if (data) {
				this.socket.send(JSON.stringify(data));
			} else {
				this.getOldMessages(this.content_offset);
			}
		});

		this.socket.addEventListener("close", (event) => {
			this.clearRequestInterval();
			if (event.wasClean) {
				console.info("Соединение закрыто чисто");
				this.clearRequestInterval();
			} else {
				console.info("Обрыв соединения");
				store.delete(["ws", "messages"]);
				const state = store.getState();
				if (state && state.user && state.activeChat) {
					const { id: chatId } = state.activeChat as TActiveChat;
					ChatController.getChatById(chatId);
				}
			}
			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		});

		this.socket.addEventListener("message", (event) => {
			const data = JSON.parse(event.data);
			const { messages } = store.getState();
			console.info("Получены данные");
			if (data instanceof Array) {
				if (data.length === 0) {
					messages ? null : store.set("messages", []);
				}
				if (data.length > 0 && data[0].type === "message") {
					if (messages) {
						const difference = getDifference(data, messages, "id");
						if (difference.length > 0) {
							store.set("messages", [...(messages as IChatMessage[]), ...difference]);
							this.content_offset += difference.length;
						}
					} else {
						store.set("messages", [...data]);
						this.content_offset += data.length;
					}
				}
				ChatController.getChats();
			} else if (data.type === "message") {
				store.set(
					"messages",
					messages ? [data, ...(messages as IChatMessage[])] : [data]
				);
				ChatController.getChats();
			} else {
				console.log(data);
			}
		});

		this.socket.addEventListener("error", (event) => {
			console.log("Ошибка", event);
		});

		this.wsRequestInterval = setInterval(() => {
			const state = store.getState();
			this.socket.send(
				JSON.stringify({
					type: "ping",
				})
			);
			if (state && state.chats) {
				const chats = state.chats as TChatItem[];
				ChatController.getChatList().then((res) => {
					const chatsResponse = res.response;
					if (
						chatsResponse &&
						chats.length !== chatsResponse.length
					) {
						ChatController.getChats();
						WebSocketController.deleteWebSocket();
						store.delete(["activeChat"]);
					}
				});
			}
		}, PING_INTERVAL);

		this.getOldMessages = this.getOldMessages.bind(this);
	}

	clearRequestInterval() {
		clearInterval(this.wsRequestInterval);
	}

	getOldMessages(offset: number = this.content_offset) {
		this.socket.send(
			JSON.stringify({
				content: offset,
				type: "get old",
			})
		);
	}

	send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
		this.socket.send(data);
	}

	close() {
		this.socket.close();
	}
}
