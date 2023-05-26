import Avatar from "../../components/ui/avatar";
import { IconArrowLeft } from "../../components/ui/icon";
import Image from "../../components/ui/image";
import Sidebar from "../../components/ui/sidebar";
import { AuthController } from "../../core/controllers/authController";
import { store, StoreEvents, TState } from "../../core/store";
import { connect } from "../../core/store/connect";
import Block from "../../utils/Block";
import { ROUTES } from "../../utils/constants";
import template from "./profile.hbs";
import './profile.scss';

const profileFields: { [key: string]: string } = {
	email: 'Почта',
	login: 'Логин',
	first_name: 'Имя',
	second_name: 'Фамилия',
	display_name: 'Имя в чате',
	phone: 'Телефон',
};

interface IProfileProps {
	userName: string;
	profileFields?: { [key: string]: string }[];
	options: { [key: string]: string }[];
}


const getUserDataList = (state: TState) => {
	if (Object.keys(state).length !== 0 && state.user) {
		return Object.keys(profileFields).map((key: Key) => {
			const title = profileFields[key];
			const value = state.user?.[key] ? state.user?.[key] : '-';
			return {
				nameField: title,
				data: value
			}
		})
	}
}

class Profile extends Block<IProfileProps> {
	constructor(props: IProfileProps) {
		// let state = store.getState();
		super('div', props);
		this.element!.classList.add('pageProfile__container');
		AuthController.getIngo();
	}


	init() {

		this.children.sidebar = new Sidebar({
			data: new IconArrowLeft({
				color: "icon-secondary",
				size: "icon-m"
			}),
			events: {
				click: () => {
					window.history.back();
				}
			}
		});

		this.children.avatar = new Image({
			src: 'images/back.phg',
			alt: 'назад',
		})

		this.props.userName = 'Aleksandr';


		// this.props.profileFields = [
		// 	{
		// 		nameField: 'Почта',
		// 		data: 'pochta@yandex.ru'
		// 	},
		// 	{
		// 		nameField: 'Логин',
		// 		data: 'IvanTheBest'
		// 	},
		// 	{
		// 		nameField: 'Имя',
		// 		data: 'Александр'
		// 	},
		// 	{
		// 		nameField: 'Фамилия',
		// 		data: 'Птицын'
		// 	},
		// 	{
		// 		nameField: 'Имя в чате',
		// 		data: 'Smoke'
		// 	},
		// 	{
		// 		nameField: 'Телефон',
		// 		data: '+7 (909) 967 30 30'
		// 	}
		// ];

		this.props.options = [
			{
				lable: 'Изменить данные',
				href: ROUTES.profileEdit.path,
			},
			{
				lable: 'Изменить пароль',
				href: ROUTES.passwordEdit.path,
			}
		]
	}

	render() {
		// console.log('thisss', this.props.user);

		return this.compile(template, this.props)
	}
}

const withPage = connect((state) => ({
	profileFields: getUserDataList(state),
}))

export const ProfilePage = withPage(Profile);
// export const ProfilePage = Profile;

