import template from "./chatList.hbs";
import Block from "../../../utils/Block";
import Text from "../../ui/text";
import { Button } from "../../ui/button";
import ChatCard from "../chatCard";
import Avatar from "../../ui/avatar";
import Image from "../../ui/image";
import InfoLable from "../../ui/infoLable";

import './chatList.scss'

interface IChatList {
	id: string;
	avatar: string;
	title: string;
	messages: {
		message: string;
		time: string
	}[];
	active: boolean;
	unread_count: string;
}


interface IChatListProps {
	data?: Block[] | Block;
}

class ChatList extends Block {
	constructor(props?: IChatListProps) {
		super('div', props);
	}

	init() {
		// const chatList = [];
		const chatList = [
			{
				id: '1',
				avatar: '',
				title: 'Олег',
				messages: [
					{
						message: 'Дарова',
						time: '9:24'
					}
					, {
						message: 'Ну как ты?',
						time: '9:25'
					}
				],
				active: false,
				unread_count: '2',
			},
			{
				id: '2',
				avatar: 'images/AvatarEmpty.png',
				title: 'Курсы IT',
				messages: [
					{
						message: 'Сегодня в выпуске...',
						time: '10:54'
					}
					, {
						message: 'Сегодня в выпуске...',
						time: '12:25'
					}
				],
				active: false,
				unread_count: '99',
			},
		];


		if (chatList.length !== 0) {
			this.element!.classList.add('chat-list');

			const getChatList = (chatList: IChatList[]) => {
				return chatList.map((chat) => {
					const chatAvatar =
						// chat.avatar ?
						// 	new Avatar({
						// 		data: new Image({
						// 			src: chat.avatar,
						// 			alt: 'Аватар'
						// 		})
						// 	}) :
						new Avatar({});

					const chatInfoLable = chat.unread_count ?
						new InfoLable({
							count: `${chat.unread_count}`
						}) : null;

					return new ChatCard({
						chatId: chat.id,
						avatar: chatAvatar,
						title: chat.title,
						message: chat.messages ? chat.messages[chat.messages.length - 1].message : 'Нет сообщений',
						datetime: chat.messages ? chat.messages[chat.messages.length - 1].time : '',
						info: chatInfoLable,
						isActive: chat.active,
						events: {
							click: (e: Event) => {
								// const target = e.currentTarget;
								// if (target && target instanceof HTMLElement) {
								// 	const activeCard = document.querySelector(".chat-card.active");
								// 	if (activeCard) {
								// 		activeCard.classList.remove("active");
								// 	}
								// 	target.classList.add("active");
								// 	const targetId = target.getAttribute("data-chat-id");
								// 	if (targetId) {

								// 	}
								// }
							}
						}
					})
				})
			}

			this.children.data = getChatList(chatList);
			// this.children.data = [
			// 	// new Avatar({
			// 	// 	data: new Image({
			// 	// 		src: 'images/AvatarEmpty.png',
			// 	// 		alt: 'Аватар'
			// 	// 	})
			// 	// }),
			// 	new Avatar({}),
			// 	new Avatar({}),
			// ];
		} else {
			this.element!.classList.add('chat-list__empty');
			this.children.data = [
				new Text({
					className: "text-silver",
					data: "У вас нет ни одного чата"
				}),
				new Button({
					color: "light",
					size: "sm",
					data: "Создать чат",
					events: {
						click: () => console.log('Создать новый чат')
					}
				})
			]

		}
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatList;
