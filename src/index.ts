import { ROUTES } from "./utils/constants";
import {
	MainPage,
	LoginPage,
	SingUpPage,
	ChatPage,
	ProfilePage,
	ProfileEditPage,
	PasswordEditPage,
	Page404,
	Page500
} from './pages';

import "./styles/globals.scss";
import Router from "./core/router";

const AppRouter = new Router("#app");
window.router = AppRouter;

document.addEventListener("DOMContentLoaded", () => {
	AppRouter
		.use(ROUTES.home.path, MainPage)
		.use(ROUTES.login.path, LoginPage)
		.use(ROUTES.register.path, SingUpPage)
		.use(ROUTES.chat.path, ChatPage)
		.use(ROUTES.profile.path, ProfilePage)
		.use(ROUTES.profileEdit.path, ProfileEditPage)
		.use(ROUTES.passwordEdit.path, PasswordEditPage)
		.use(ROUTES.error_404.path, Page404)
		.use(ROUTES.error_500.path, Page500)
		.start()
});
