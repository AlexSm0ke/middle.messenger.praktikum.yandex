import { ProfileUserAvatar } from "../../components/sections/userAvatar/userAvatar";
import Avatar from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import DivBlock from "../../components/ui/div";
import { Form } from "../../components/ui/form";
import { IconArrowLeft, IconAvatar } from "../../components/ui/icon";
import Image from "../../components/ui/image";
import { InputFile } from "../../components/ui/inputFile";
import { Modal, modalCloseHandler } from "../../components/ui/modal";
import Sidebar from "../../components/ui/sidebar";
import { AuthController } from "../../core/controllers/authController";
import { UserController } from "../../core/controllers/userController";
import { TState } from "../../core/store";
import { connect } from "../../core/store/connect";
import Block from "../../utils/Block";
import { ROUTES } from "../../utils/constants";
import { formDataSubmitHandler } from "../../utils/formHandler";
import { render } from "../../utils/renderDom";
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

const changeAvatar = () => {
	const modal = new Modal({
		id: 'changeAvatar',
		title: 'Загрузка файла',
		data: new Form({
			className: 'change-avatar__form',
			data: [
				new InputFile({
					id: 'avatar',
					name: 'avatar',
					placeholderText: 'Выберите файл',
					isAcceptImage: true,
				}),
				new Button({
					color: 'primary',
					isFluid: true,
					size: 'lg',
					data: 'Поменять',
					type: 'submit',
				})
			],
			events: {
				submit: (event: Event) => {
					formDataSubmitHandler({
						event,
						handler: UserController.changeAvatar,
						selector: '.change-avatar__form__input-group',
						action: () => modalCloseHandler(),
					});
				},
			},
		})
	});

	render('#modal-root', modal);
	modal.show();
}

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

		this.children.avatarOverlay = new DivBlock({
			className: 'user-avatar__overlay',
			data: new IconAvatar({
				color: 'icon-white',
				size: 'icon-xxl',
			}),
			events: {
				click: changeAvatar,
			},
		});

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
			profileFields: getUserDataList(state),
			userAvatar: ProfileUserAvatar(state)
		}
	} else {
		return {
			UserName: '',
			profileFields: []
		};
	}
})

export const ProfilePage = withPage(Profile);
