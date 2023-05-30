import template from "./chatList.hbs";
import Block from "../../../utils/Block";
import Text from "../../ui/text";
import { Button } from "../../ui/button";
import ChatCard from "../chatCard";
import Avatar from "../../ui/avatar";
import Image from "../../ui/image";
import { TState } from "../../../core/store";
import { TActiveChat, TChatItem } from "../../../types";
import { API_RESOURCES_PATH } from "../../../utils/constants";
import { ChatController } from "../../../core/controllers/chatController";
import DivBlock from "../../ui/div";
import { createNewChat } from "../chatSidebar";
import { Label2 } from "../../ui/label";
import { dateConvert } from "../../../utils/dateConvert";
import './chatList.scss'

interface IChatList {
	state: TState;
}

const getChatList = (state: TState) => {

	if (state.chats && (state.chats as IChatList[]).length !== 0) {
		const chats = state.chats as TChatItem[];
		const activeChat = state.activeChat as TActiveChat;
		let activeChatId: number;
		if (activeChat) {
			activeChatId = activeChat.id;
		}
		return chats.map((item) => {
			const chatAvatar =
				item.avatar
					? new Avatar({
						data: new Image({
							src: API_RESOURCES_PATH + item.avatar,
						}),
					})
					: new Avatar({});

			const chatLabel =
				item.unread_count
					? new Label2({
						color: 'label-primary',
						isCircle: true,
						data: `${item.unread_count}`,
					})
					: null;

			return new ChatCard({
				chatId: item.id,
				avatar: chatAvatar,
				title: item.title,
				message:
					item.last_message && item.last_message.content
						? item.last_message.content
						: 'Нет сообщений',
				datetime:
					item.last_message && item.last_message.time
						? dateConvert(item.last_message.time)
						: '',
				info: chatLabel,
				isActive: !!(activeChatId && activeChatId === item.id),
				events: {
					click: (event: Event) => {
						const target = event.currentTarget;
						if (target && target instanceof HTMLElement) {
							const targetId = target.getAttribute('data-chat-id');
							if (targetId && activeChatId !== parseInt(targetId)) {
								ChatController.getChatById(parseInt(targetId));
							}
						}
					},
				},
			});
		});
	}

	return new DivBlock({
		className: 'chat-list__empty-message',
		data: [
			new Text({
				className: 'text-extra-dark',
				data: 'У вас нет ни одного чата',
			}),
			new Button({
				color: 'light',
				size: 'sm',
				data: 'Создать чат',
				events: {
					click: createNewChat,
				},
			}),
		],
	});
};

class ChatList extends Block<IChatList>{
	constructor(props: IChatList) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('chat-list')
		this.children.data = getChatList(this.props.state);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatList;
