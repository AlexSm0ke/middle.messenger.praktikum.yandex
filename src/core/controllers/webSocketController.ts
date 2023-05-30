import { IUser, TActiveChat } from "../../types";
import { WebSocketTransport } from "../api/webSocketTransport";
import { store } from "../store";

export class WebSocketController {
	static createNewWebSocket(token: string) {
		const state = store.getState();
		if (state) {
			this.deleteWebSocket();

			if (state.user && state.activeChat) {
				store.set(
					"ws",
					new WebSocketTransport(
						(state.user as IUser).id,
						(state.activeChat as TActiveChat).id,
						token
					)
				);
			}
		}
	}

	static deleteWebSocket() {
		const state = store.getState();
		if (state && state.ws) {
			(state.ws as WebSocketTransport).close();
			store.delete(["ws", "messages"]);
		}
	}

	static getOldMessages(offset?: number) {
		const state = store.getState();

		if (state && state.ws) {
			(state.ws as WebSocketTransport).getOldMessages(offset);
		}
	}
}
