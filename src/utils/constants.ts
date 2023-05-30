export interface IRouter {
	[key: string]: { title: string, path: string }
}

export const API_PATH = 'https://ya-praktikum.tech/api/v2';
export const API_RESOURCES_PATH = `${API_PATH}/resources`;
export const WSS_PATH = 'wss://ya-praktikum.tech/ws/chats';

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

export const API_ENDPOINTS = {
	auth: {
		signUp: `${API_PATH}/auth/signup`,
		signIn: `${API_PATH}/auth/signin`,
		user: `${API_PATH}/auth/user`,
		logout: `${API_PATH}/auth/logout`
	},
	users: {
		changeProfile: `${API_PATH}/user/profile`,
		changeAvatar: `${API_PATH}/user/profile/avatar`,
		changePassword: `${API_PATH}/user/password`,
		getUserById: (id: string) => `${API_PATH}/user/${id}`,
		searchUserByLogin: `${API_PATH}/user/search`,
	},
	chats: {
		chats: `${API_PATH}/chats`,
		chatUsersById: (id: number) => `${API_PATH}/chats/${id}/users`,
		newMessagesCount: (id: string) => `${API_PATH}/chats/new/${id}`,
		chatsUsers: `${API_PATH}/chats/users`,
		getChatUsers: (id: number) => `${API_PATH}/chats/token/${id}`,
	},
}
