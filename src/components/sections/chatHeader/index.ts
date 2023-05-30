import { TState } from '../../../core/store';
import { IChatUser, IUser, TActiveChat } from '../../../types';
import Block from '../../../utils/Block';
import DivBlock from '../../ui/div';
import Dropdown from '../../ui/dropdown';
import { IconAdd, IconDelete, IconTrash } from '../../ui/icon';
import Text from '../../ui/text';
import template from './chatHeader.hbs';
import { AddUserModal } from './components/addUserModal';
import { DeleteUserModal } from './components/deleteUserModal';
import './chatHeader.scss';

interface IChatHeader {
	state: TState;
}

export class ChatHeader extends Block<IChatHeader> {
	constructor(props: IChatHeader) {
		super('div', props);
		this.element!.classList.add('chat-header');
	}

	init() {
		const { state } = this.props;
		const user = state.user as IUser;
		const activeChat = state.activeChat as TActiveChat;
		const activeChatId = activeChat.id as number;
		const activeChatUsers = activeChat.users as IChatUser[];

		this.children.userBlock = new DivBlock({
			className: 'user-group-block',
			data: [
				new DivBlock({
					className: 'user-block__name',
					data: 'Название чата'
				})
			],
			events: {
				click: () => console.log('Показать детально пользователя'),

			}
		})

		this.children.dropdown = new Dropdown({
			dropdownButtonIsSquare: true,
			// dropdownButtonContent: new IconDots({ size: 'icon-m' }),
			dropdownButtonContent: '+',
			dropdownMenuContent: new DivBlock({
				className: 'dropdown-menu__content',
				data: [
					new DivBlock({
						className: 'dropdown-item',
						data: [
							new IconAdd({
								color: 'icon-primary',
								size: 'icon-m',
							}),
							new Text({
								data: 'Добавить пользователя',
							}),
						],
						events: {
							click: AddUserModal,
						},
					}),
					new DivBlock({
						className: 'dropdown-item',
						data: [
							new IconDelete({
								color: 'icon-primary',
								size: 'icon-m',
							}),
							new Text({
								data: 'Удалить пользователя',
							}),
						],
						events: {
							click: () =>
								DeleteUserModal(
									user,
									activeChatUsers,
									activeChatId
								),
						},
					}),
					new DivBlock({
						className: 'dropdown-item',
						data: [
							new IconTrash({
								color: 'icon-secondary',
								size: 'icon-m',
							}),
							new Text({
								data: 'Удалить чат',
							}),
						],
						events: {
							click: () => console.log('Скоро будет удаление')
						},
					}),
				]
			})
		})
	}

	render() {
		return this.compile(template, this.props);
	}
}
