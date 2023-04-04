import Block from "../../../utils/Block";
import template from "./chatCard.hbs";
import "./chatCard.scss";

interface IChardCard {
	chatId: string;
	avatar: Block;
	title: string;
	message: string;
	datetime: string;
	info?: Block | null;
	isActive?: boolean;
	events?: {
		click?: (e: Event) => void;
	}
}

class ChatCard extends Block {
	constructor(props: IChardCard) {
		super('div', props);
		this.element!.classList.add('chat-card');
	}

	inin() {
		this.element!.setAttribute('data-chat-id', this.props.chatId);
		if (this.props.isActive) this.element!.classList.add('active');
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatCard;
