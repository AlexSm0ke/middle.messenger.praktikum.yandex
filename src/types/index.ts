// Авторизация, регистрация
export type TSignUpData = {
	first_name: string,
	second_name: string,
	login: string,
	email: string,
	password: string,
	phone: string,
};

export type TChatTitleData = {
	title: string;
}

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
