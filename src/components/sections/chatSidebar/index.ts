import Block from "../../../utils/Block";
import { Button } from "../../ui/button";
import Input from "../../ui/input";
import ChatList from "../chatList";
import template from './chatSidebar.hbs';
import './chatSidebar.scss'


interface ISidebarProps {

}

export class ChatSidebar extends Block {
	constructor(props: ISidebarProps) {
		super('div', props);
		this.element!.classList.add('chat-sidebar');
	}

	init() {
		const logoLink = '/';

		const newChatButton = new Button({
			data: 'новое сообщение',
			id: "dropdownMenuButton",
			events: {
				click: () => console.log('Здесь должна быть функция. Открываю модальное окно нового чата'),
			}

		});

		const inputSearch = new Input({
			id: 'search',
			name: 'search',
			className: 'input-search',
			placeholder: 'Поиск',
		})



		// const chatList = new ChatlistSection({})

		this.props.logoLink = logoLink;
		this.children.newChatButton = newChatButton;
		this.children.inputSearch = inputSearch;
		this.children.chatList = new ChatList({});
		const array = ['1', '2', '3', '4'];
		const isArray = Array.isArray(array)
		this.props.isArray = isArray;
		this.props.nav = ['1', '2', '3', '4'];

	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
