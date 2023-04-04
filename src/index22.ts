import './components/ui/input';
import './components/ui/inputField';
import './components/ui/button';
import './components/sections/pageError';
import './components/sections/layoutProfile';
import './components/sections/layoutModal';
import './pages/page404';
import './components/sections/routers';
import login from './pages/login/login.hbs';
import singup from './pages/singup/singup.hbs';
import page404 from './pages/page404/page404.hbs';
import page500 from './pages/page500/page500.hbs';
import profile from './pages/profile/profile.hbs';
import profileEdit from './pages/profileEdit/profileEdit.hbs';
import profilePassword from './pages/profilePassword/profilePassword.hbs';
// import avatar from '../public/images/union.png';
// import back from '../public/images/back.png';
import chat from './pages/chat/chat.hbs';
import { Login } from './pages/login';
import { SingUp } from './pages/singup';
import { ChatSidebar } from './components/sections/chatSidebar';
import { ChatPage } from './pages/chat';

var handlebars = require('handlebars'),
	layout = require('handlebars-layouts');

layout.register(handlebars);

function render(html) {
	const app = document.querySelector('#app');
	app.innerHTML = html;
};

const PROPS = {

	'singup': {
		fields: [
			{
				name: "email",
				placeholder: "Почта",
			},
			{
				name: "login",
				placeholder: "Логин",
			},
			{
				name: "first_name",
				placeholder: "Имя",
			},
			{
				name: "second_name",
				placeholder: "Фамилия",
			},
			{
				name: "phone",
				placeholder: "Телефон",
			},
			{
				name: "Пароль",
				placeholder: "password",
			},
			{
				name: "Пароль (ещё раз)",
				placeholder: "password",
			},
		]
	},
	'page404': {},
	'page500': {},
	'profile': {
		// avatar: avatar,
		// back: back,
		UserName: 'Александр',
		fields: [
			{
				nameField: "Почта",
				data: "pochta@yandex.ru"
			},
			{
				nameField: "Логин",
				data: "IvanTheBest",
			},
			{
				nameField: "Имя",
				data: "Александр",
			},

			{
				nameField: "Фамилия",
				data: "Птицын",
			},
			{
				nameField: "Имя в чате",
				data: "Smoke",
			},
			{
				nameField: "Телефон",
				data: "+7 (909) 967 30 30",
			}
		],
		options: [
			{
				lable: "Изменить данные"
			},
			{
				lable: "Изменить пароль"
			},
		]
	},
	'profileEdit': {
		// avatar: avatar,
		// back: back,
		UserName: 'Олегuu',
		lable: "Cохранить",
		primary: "primary",
		fields: [
			{
				name: "email",
				placeholder: "Почта",
			},
			{
				name: "login",
				placeholder: "Логин",
			},
			{
				name: "first_name",
				placeholder: "Имя",
			},
			{
				name: "second_name",
				placeholder: "Фамилия",
			},
			{
				name: "display_name",
				placeholder: "Имя в чате",
			},
			{
				name: "phone",
				placeholder: "Телефон",
			}
		]
	},
	'profilePassword': {
		// avatar: avatar,
		// back: back,
		UserName: 'Олег',
		lable: "Cохранить",
		primary: "primary",
		fields: [
			{
				name: "oldPassword",
				placeholder: "Старый пароль",
			},
			{
				name: "newPassword",
				placeholder: "Новый пароль",
			},
			{
				name: "newPassword",
				placeholder: "Повторите новый пароль",
			},
		]
	}
}

const ROUTES = {
	'login': login,
	'singup': singup,
	'page404': page404,
	'page500': page500,
	'profile': profile,
	'profileEdit': profileEdit,
	'profilePassword': profilePassword,
	'chat': chat,
};

window.goToPage = function (namePage) {
	const page = ROUTES[namePage];
	const props = PROPS[namePage];
	render(page(props));
}

window.addEventListener('DOMContentLoaded', () => {

	// render(ROUTES.login(PROPS.login));


	const app = document.querySelector('#app');
	const loginPage = new Login({});
	const singUp = new SingUp({});
	const chatSidebar = new ChatSidebar({});
	const chatPage = new ChatPage({});
	// const singUp = new SingUp({});


	// app!.innerHTML = loginPage.element!.outerHTML;
	app!.appendChild(chatPage.element as HTMLElement);
})

