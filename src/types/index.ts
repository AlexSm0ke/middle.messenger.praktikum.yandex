// Авторизация, регистрация
export type TSignUpData = {
	first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string,
};


//Профиль
export type TUserProfileData = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type TUserPasswordData = {
	oldPassword: string;
	newPassword: string;
}

export type TUserLogin = {
	login: string;
}

export interface IUser {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}

// Чат
export type TLastMessageUser = {
	first_name: string;
	second_name: string;
	avatar: string | null;
	email: string;
	login: string;
	phone: string;
};

export type TLastMessage = {
	user: TLastMessageUser;
	time: string;
	content: string;
}

export type TChatItem = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	last_message: TLastMessage | null;
	created_by: number;
}

export interface IChatUser extends IUser {
	role: string;
}

export type TChatTitleData = {
	title: string;
}

export type TChatIdData = {
	chatid: number;
}

export type TActiveChat = {
	users: IChatUser[];
	id: number;
}

export interface IChatMessage {
	id: number;
	chat_id: number;
	time: string;
	type: string;
	user_id: string;
	content: string;
	user?: boolean;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
}
