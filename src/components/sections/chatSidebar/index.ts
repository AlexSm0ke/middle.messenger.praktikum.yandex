import { AuthController } from '../../../core/controllers/authController';
import Router from '../../../core/router';
import Block from '../../../utils/Block';
import { ROUTES } from '../../../utils/constants';
import { Button } from '../../ui/button';
import { IconLogout, IconNewChat, IconProfile } from '../../ui/icon';
import Input from '../../ui/input';
import ChatList from '../chatList';
import template from './chatSidebar.hbs';
import './chatSidebar.scss'


interface ISidebarProps {

}

export class ChatSidebar extends Block {
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
				click: () => console.log('Здесь должна быть функция. Открываю модальное окно нового чата'),
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
