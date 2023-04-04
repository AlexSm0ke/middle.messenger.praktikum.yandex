import Block from "../../utils/Block";
import template from './chat.hbs';
import { ChatSidebar } from "../../components/sections/chatSidebar";
import { ChatHeader } from '../../components/sections/chatHeader';
import ChatFooter from '../../components/sections/chatFooter';
import ChatMessage from '../../components/sections/chatMessage';
import './chat.scss';

interface IChatPageProps {
	sidebar?: Block;
	header?: Block;
	footer?: Block;
}

class Chat extends Block {
	constructor(props: IChatPageProps) {
		super('div', props);
		this.element!.classList.add('wraper');
	}

	init() {
		this.children.sidebar = new ChatSidebar({});
		this.children.header = new ChatHeader({})
		this.children.messageArea = new ChatMessage({})
		this.children.footer = new ChatFooter({})

	}

	render() {
		return this.compile(template, this.props);
	}
}

const ChatPage = new Chat({});

export default ChatPage;
