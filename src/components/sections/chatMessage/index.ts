import Block from '../../../utils/Block';
import Text from '../../ui/text';
import template from './chatMessage.hbs';
import './chatMessage.scss';


interface IChatMessage {

}

class ChatMessage extends Block {
	constructor(props?: IChatMessage) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('chat-container');

		const messages = [];

		if (!messages.length) {
			this.element!.classList.add('empty');
			this.children.messages = new Text({
				className: "text-silver",
				data: "Сообщения отсутствуют"
			})
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatMessage;
