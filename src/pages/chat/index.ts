import template from './chat.hbs';
import { ChatSidebar } from "../../components/sections/chatSidebar";
import Block from "../../utils/Block";
import { ChatHeader } from '../../components/sections/chatHeader';
import './chat.scss';

interface IChatPageProps {
	sidebar?: Block;
	header?: Block;
	footer?: Block;
}

export class ChatPage extends Block {
	constructor(props: IChatPageProps) {
		super('div', props);
		this.element!.classList.add('wrapper');
	}

	init() {
		this.children.sidebar = new ChatSidebar({});
		this.children.header = new ChatHeader({})

	}

	render() {
		return this.compile(template, this.props);
	}
}

