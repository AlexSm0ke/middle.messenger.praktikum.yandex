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
import { AuthController } from "./core/controllers/authController";

const authChecker = () => AuthController.checkUser().then((res) => res.status === 200);
const AppRouter = new Router("#app");
window.router = AppRouter;

const protectedRoute = true;
const redirectTo = ROUTES.chat.path;

document.addEventListener("DOMContentLoaded", () => {
	AppRouter.authCheck(authChecker)
		.use(ROUTES.home.path, MainPage)
		.use(ROUTES.login.path, LoginPage, !protectedRoute, redirectTo)
		.use(ROUTES.register.path, SingUpPage, !protectedRoute, redirectTo)
		.use(ROUTES.chat.path, ChatPage, protectedRoute)
		.use(ROUTES.profile.path, ProfilePage, protectedRoute)
		.use(ROUTES.profileEdit.path, ProfileEditPage, protectedRoute)
		.use(ROUTES.passwordEdit.path, PasswordEditPage, protectedRoute)
		.use(ROUTES.error_404.path, Page404)
		.use(ROUTES.error_500.path, Page500)
		.start()
});
