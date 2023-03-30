import Block from '../../../utils/Block';
import DivBlock from '../../ui/div';
import Dropdown from '../../ui/dropdown';
import template from './chatFooter.hbs';
import './chatFooter.scss';


interface IChatFooter {
	dropdown?: Block;
	inputMessage?: Block;
	buttonSend?: Block;
}

class ChatHeader extends Block {
	constructor(props?: IChatFooter) {
		super('div', props);
		this.element!.classList.add('chat-footer');
	}

	init() {
		// this.children.dropdown = new Dropdown({

		// })
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatHeader;
