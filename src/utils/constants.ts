export interface IRouter {
	[key: string]: { title: string, path: string }
}

export const ROUTES: IRouter = {
	home: { title: "Главная", path: "/" },
	login: { title: "Вход", path: "/login" },
	register: { title: "Регистрация", path: "/register" },
	chat: { title: "Мессенджер", path: "/chat" },
	profile: { title: "Личный кабинет", path: "/profile" },
	profileEdit: { title: "Редактирование профиля", path: "/profile-edit" },
	passwordEdit: { title: "Изменение пароля", path: "/password-edit" },
	error_404: { title: "Ошибка 404", path: "/404" },
	error_500: { title: "Ошибка 500", path: "/500" },
}

export const API_PATH = "https://ya-praktikum.tech/api/v2";

export const API_ENDPOINTS = {
	auth: {
		signUp: `${API_PATH}/auth/signup`,
		signIn: `${API_PATH}/auth/signin`,
		user: `${API_PATH}/auth/user`,
		logout: `${API_PATH}/auth/logout`
	},
}
