import Block from "../../utils/Block";
import template from './chat.hbs';
import { ChatSidebar } from "../../components/sections/chatSidebar";
import { ChatHeader } from '../../components/sections/chatHeader';
import ChatFooter from '../../components/sections/chatFooter';
import { ChatMessageArea } from '../../components/sections/chatMessage';
import './chat.scss';
import { AuthController } from "../../core/controllers/authController";
import { ChatController } from "../../core/controllers/chatController";
import { connect } from "../../core/store/connect";
import { TState } from "../../core/store";
import Text from "../../components/ui/text";
import DivBlock from "../../components/ui/div";

interface IChatPageProps {
	sidebar?: Block;
	header?: Block;
	footer?: Block;
}

const getHeader = (state: TState) => {
	if (Object.keys(state).length === 0 || !state.activeChat || !state.messages)
		return new DivBlock({});

	return new ChatHeader({ state });
};

const getChatMessageArea = (state: TState) => {

	if (Object.keys(state).length === 0 || !state.activeChat)
		return new DivBlock({
			className: ['chat-container', 'empty'],
			data: [
				new Text({
					className: 'text-dark',
					data: 'Выберите чат, чтобы начать общение',
				}),
			],
		});

	return new ChatMessageArea({ state });
};

const getFooter = (state: TState) => {
	if (Object.keys(state).length === 0 || !state.activeChat || !state.messages)
		return new DivBlock({});

	return new ChatFooter({ state });
};

class Chat extends Block<IChatPageProps> {

	init() {
		this.element!.classList.add('wraper');
		AuthController.getInfo();
		ChatController.getChats();
	}

	render() {
		return this.compile(template, this.props);
	}
}

const withPage = connect((state) => ({
	sidebar: new ChatSidebar({ state }),
	header: getHeader(state),
	footer: getFooter(state),
	messageArea: getChatMessageArea(state),
}));

export const ChatPage = withPage(Chat);
