import { AuthController } from '../../../core/controllers/authController';
import { ChatController } from '../../../core/controllers/chatController';
import Router from '../../../core/router';
import Block from '../../../utils/Block';
import { ROUTES } from '../../../utils/constants';
import { formDataSubmitHandler } from '../../../utils/formHandler';
import { render } from '../../../utils/renderDom';
import { Button } from '../../ui/button';
import { Form } from '../../ui/form';
import { IconLogout, IconNewChat, IconProfile } from '../../ui/icon';
import Input from '../../ui/input';
import { Modal, modalCloseHandler } from '../../ui/modal';
import ChatList from '../chatList';
import template from './chatSidebar.hbs';
import './chatSidebar.scss'


interface ISidebarProps {
	logoLink?: string;
}

export const createNewChat = () => {
	const modal = new Modal({
		id: 'createNewChatModal',
		title: 'Создание нового чата',
		data: new Form({
			className: 'add-value__form',
			data: [
				new Input({
					className: 'input-newChat',
					id: 'createNewChat',
					name: 'title',
					placeholder: 'Название чата',
				}),
				new Button({
					color: 'primary',
					isFluid: true,
					size: 'lg',
					data: 'Создать',
				})
			],
			events: {
				submit: (event: Event) => {
					formDataSubmitHandler({
						event,
						handler: ChatController.addChat,
						selector: '.add-value__form__input-group',
						action: () => {
							modalCloseHandler();
						},
					});
				},
			}

		}),

	});

	render('#modal-root', modal);
	modal.show();
}

export class ChatSidebar extends Block<ISidebarProps> {
	constructor(props: ISidebarProps) {
		super('div', props);
		this.element!.classList.add('chat-sidebar');
	}

	init() {
		const logoLink = '/';

		const newChatButton = new Button({
			data: new IconNewChat({
				size: 'icon-m'
			}),
			id: 'dropdownMenuButton',
			isSquare: true,
			events: {
				click: createNewChat,
			}

		});

		const inputSearch = new Input({
			id: 'search',
			name: 'search',
			className: 'input-search',
			placeholder: 'Поиск',
		})



		// const chatList = new ChatlistSection({})

		this.props.logoLink = logoLink;
		this.children.newChatButton = newChatButton;
		this.children.inputSearch = inputSearch;
		this.children.chatList = new ChatList({});
		this.children.nav = [
			new Button({
				size: 'lg',
				isSquare: true,
				data: new IconProfile({
					color: 'icon-primary',
					size: 'icon-m'
				}),
				events: {
					click: () => Router.getInstanse().go(ROUTES.profile.path)
				},
			}),
			new Button({
				size: 'lg',
				isSquare: true,
				data: new IconLogout({
					color: 'icon-secondary',
					size: 'icon-m'
				}),
				events: {
					click: async (e: Event) => {
						e.preventDefault();
						AuthController.logout();
					}
				},
			})
		];

	}

	render() {
		return this.compile(template, { ...this.props })
	}
}
