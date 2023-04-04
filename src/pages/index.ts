import MainPage from "./main";
import LoginPage from "./login";
import SingUpPage from "./singup";
import ChatPage from "./chat";
import ProfilePage from "./profile";
import ProfileEditPage from "./profileEdit";
// import PasswordEditPage from "./passwordEdit";
import ErrorPage from "./page404";

const Page500 = new ErrorPage({
	titleError: '500',
	textError: 'Мы уже фиксим'
})

export {
	MainPage,
	LoginPage,
	SingUpPage,
	ChatPage,
	ProfilePage,
	ProfileEditPage,
	// PasswordEditPage,
	ErrorPage,
	Page500
};
