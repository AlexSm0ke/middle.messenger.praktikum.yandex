import { ChatController } from '../../../core/controllers/chatController';
import { store, TState } from '../../../core/store';
import Block from '../../../utils/Block';
import { validateInput } from '../../../utils/validations';
import { Button } from '../../ui/button';
import DivBlock from '../../ui/div';
import Dropdown from '../../ui/dropdown';
import { Form } from '../../ui/form';
import { IconArrowRight } from '../../ui/icon';
import Input from '../../ui/input';
import template from './chatFooter.hbs';
import './chatFooter.scss';


interface IChatFooter {
	state: TState
}

class ChatFooter extends Block<IChatFooter> {
	constructor(props: IChatFooter) {
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

		this.children.messageBlock = new Form({
			className: 'chat-footer__form',
			data: [
				new Input({
					className: 'input-search',
					id: 'message',
					name: 'message',
					placeholder: 'Сообщение',
				}),
				new Button({
					color: 'primary',
					isSquare: true,
					size: 'lg',
					type: 'submit',
					data: new IconArrowRight({
						size: 'icon-m'
					}),
				}),
			],
			events: {
				submit: (event: Event) => {
					event.preventDefault();
					const state = store.getState();
					const { target } = event;
					if (target && (Boolean(state.ws))) {
						const ws = state.ws as WebSocket;
						const input = (target as HTMLFormElement).elements[0] as HTMLInputElement;
						const { value } = input;
						if (value.trim() !== '' && ws !== null && ws !== undefined) {
							ws.send(
								JSON.stringify({
									content: value,
									type: 'message',
								})
							);
							ChatController.getChats();
						}
						input.value = '';
					}
				},
			},
		});
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ChatFooter;
