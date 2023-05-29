import Avatar from "../../components/ui/avatar";
import { IconArrowLeft } from "../../components/ui/icon";
import Image from "../../components/ui/image";
import Sidebar from "../../components/ui/sidebar";
import { AuthController } from "../../core/controllers/authController";
import { TState } from "../../core/store";
import { connect } from "../../core/store/connect";
import Block from "../../utils/Block";
import { ROUTES } from "../../utils/constants";
import template from "./profile.hbs";
import './profile.scss';

export const profileFields: { [key: string]: string } = {
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

// type TProfileProps = {
// 	name: string;
// 	email: string;
// 	// userName: string;
// }

const getUserDataList = (state: TState): any => {
	if (Object.keys(state).length !== 0 && state.user) {
		return Object.keys(profileFields).map((key) => {
			const title = profileFields[key];
			const value = state.user?.[key] ?? '';
			return {
				nameField: title,
				data: value
			}
		})
	}
}

class Profile extends Block<IProfileProps> {

	init() {
		this.element!.classList.add('pageProfile__container');
		AuthController.getInfo();

		this.children.sidebar = new Sidebar({
			data: new IconArrowLeft({
				size: "icon-xl"
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
		return this.compile(template, this.props)
	}
}

const withPage = connect<IProfileProps>((state: TState) => {

	if (state['user'] !== undefined) {
		return {
			UserName: state.user.display_name,
			profileFields: getUserDataList(state)
		}
	} else {
		return {
			UserName: '',
			profileFields: []
		};
	}
})

export const ProfilePage = withPage(Profile);
