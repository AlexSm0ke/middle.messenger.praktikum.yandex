import { routes } from "./utils/constants";
import {
	MainPage,
	LoginPage,
	SingUpPage,
	ChatPage,
	ProfilePage,
	ProfileEditPage,
	// PasswordEditPage,
	ErrorPage,
	Page500
} from './pages';

import "./styles/globals.scss";
import Block from './utils/Block';


const currentPath: string = window.location.pathname;

const pages: { [key: string]: Block } = {
	[routes.home.path]: MainPage,
	[routes.login.path]: new LoginPage({}),
	[routes.register.path]: new SingUpPage({}),
	[routes.chat.path]: ChatPage,
	[routes.profile.path]: ProfilePage,
	[routes.profileEdit.path]: ProfileEditPage,
	// [routes.passwordEdit.path]: PasswordEditPage,
	[routes.error_404.path]: new ErrorPage({}),
	[routes.error_500.path]: Page500
}

const renderDOM = (elem: string, block: Block) => {
	const root = document.querySelector(elem);

	root!.innerHTML = '';
	root!.appendChild(block.getContent() as HTMLElement);
	block.dispatchComponentDidMount();
};

Object.entries(pages).forEach(([url, page]) => {
	if (currentPath === url) {
		renderDOM('#app', page);
	}
});
