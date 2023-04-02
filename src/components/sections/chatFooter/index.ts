import Block from '../../../utils/Block';
import { validateInput } from '../../../utils/validations';
import { Button } from '../../ui/button';
import DivBlock from '../../ui/div';
import Dropdown from '../../ui/dropdown';
import Input from '../../ui/input';
import template from './chatFooter.hbs';
import './chatFooter.scss';


interface IChatFooter {
	dropdown?: Block;
	inputMessage?: Block;
	buttonSend?: Block;
}

class ChatFooter extends Block {
	constructor(props?: IChatFooter) {
		super('div', props);
		this.element!.classList.add('chat-footer');
	}

	init() {
		this.children.dropdown = new Dropdown({
			className: 'up',
			dropdownButtonSize: 'lg',
			dropdownButtonIsSquare: true,
			dropdownButtonContent: '+',
			dropdownMenuContent: new DivBlock({
				className: 'dropdown-menu__content',
				data: [
					new DivBlock({
						className: 'dropdown-item',
						data: [
							'+',
							'Добавить фото или видео',
						],
						events: {
							click: () => console.log('Добавить фото'),
						}
					}),
					new DivBlock({
						className: 'dropdown-item',
						data: [
							'+',
							'Добавить файл'
						],
						// [
						// 	new IconDelete({ color: 'primary' }),
						// 	new Text({
						// 		data: 'Удалить пользователя'
						// 	})
						// ],
						events: {
							click: () => console.log('Добавить файл'),
						}
					}),
				]
			})
		});

		this.children.inputMessage = new Input({
			className: 'input-search',
			id: 'message',
			name: 'message',
			placeholder: 'Сообщение',
			events: {
				blur: (event: Event) => validateInput(event.target as HTMLInputElement),
			}
		});

		this.children.buttonSend = new Button({
			color: 'primary',
			size: 'lg',
			isSquare: true,
			data: '>'
		})
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatFooter;
