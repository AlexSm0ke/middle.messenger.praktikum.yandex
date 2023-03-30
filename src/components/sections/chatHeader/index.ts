import Block from '../../../utils/Block';
import Avatar from '../../ui/avatar';
import DivBlock from '../../ui/div';
import Dropdown from '../../ui/dropdown';
import template from './chatHeader.hbs';
import './chatHeader.scss';


interface IChatHeader {
	userAvatar?: Block;
	userName?: string;
	dropdown?: Block;
}

export class ChatHeader extends Block {
	constructor(props?: IChatHeader) {
		super('div', props);
		this.element!.classList.add('chat-header');
	}

	init() {
		this.children.userBlock = new DivBlock({
			className: 'user-group-block',
			content: [
				new DivBlock({
					className: 'avatar-group',
					content: new Avatar({
						content: '<img src="http://htmlbook.ru/images/logo.gif" width="450" height="450" alt="Фото">'
					})
				}),
				new DivBlock({
					className: 'user-block__name',
					content: 'Евлампий'
				})
			],
			events: {
				click: () => console.log('Показать детально пользователя'),

			}
		})

		this.children.dropdown = new Dropdown({
			dropdownButtonIsSquare: true,
			dropdownButtonContent: 'строка',
			dropdownMenuContent: new DivBlock({
				className: 'dropdown-menu__content',
				content: [
					new DivBlock({
						className: 'dropdown-item',
						content: new Avatar({
							content: 'Добавить'
						})
						// [
						//     // new IconAdd({ color: 'primary' }),

						//     new Text({
						//         content: 'Добавить пользователя'
						//     })
						// ]
						,
						events: {
							click: () => console.log('Добавить пользователя в чат'),
						}
					}),
					new DivBlock({
						className: 'dropdown-item',
						content: 'Удалить пользователя',
						// [
						// 	new IconDelete({ color: 'primary' }),
						// 	new Text({
						// 		content: 'Удалить пользователя'
						// 	})
						// ],
						events: {
							click: () => console.log('Удалить пользователя'),
						}
					}),
				]
			})
		})
	}

	render() {
		return this.compile(template, this.props);
	}
}