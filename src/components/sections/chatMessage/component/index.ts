// Core
// Template
import Block from '../../../../utils/Block';
import template from './chatMessage.hbs';
// Styles
import './chatMessage.scss';

interface IChatMessage {
	id: number;
	chat_id: number;
	user_id: string;
	data: string;
	datetime: Block | null;
	user?: boolean;
}

export class ChatMessage extends Block<IChatMessage> {
	constructor(props: IChatMessage) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('chat-message');
		if (this.props.user) this.element!.classList.add('right')
		this.element!.setAttribute('id', this.props.id.toString());
		this.element!.setAttribute('data-chat-id', this.props.chat_id.toString());
		this.element!.setAttribute('data-user-id', this.props.user_id);
	}

	render() {
		return this.compile(template, this.props);
	}
}
