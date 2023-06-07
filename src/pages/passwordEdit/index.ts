
import { Button } from "../../components/ui/button";
import Image from "../../components/ui/image";
import { LabledInput } from "../../components/ui/LabledInput";
import Sidebar from "../../components/ui/sidebar";
import Block from "../../utils/Block";
import template from "./passwordEdit.hbs";
import { inputValueHandler, validateInput } from '../../utils/validations';
import './passwordEdit.scss';
import { Form } from "../../components/ui/form";
import { formDataSubmitHandler } from "../../utils/formHandler";
import { UserController } from "../../core/controllers/userController";
import { ROUTES } from "../../utils/constants";
import { Router } from "../../core/router";
import { AuthController } from "../../core/controllers/authController";
import { connect } from "../../core/store/connect";
import { TState } from "../../core/store";
import { ProfileUserAvatar } from "../../components/sections/userAvatar/userAvatar";
import { IconArrowLeft } from "../../components/ui/icon";

interface IPasswordEditProps {
	userName: string;
	profileFieldsEdit: Block;
	userAvatar: Block;
}

class PasswordEdit extends Block<IPasswordEditProps> {

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

		const inputFields: { [key: string]: string } = {
			oldPassword: 'Старый пароль',
			newPassword: 'Новый пароль',
			returnNewPass: 'Повторите новый пароль',
		};

		const inputLabled = Object.keys(inputFields).map((key) => {
			const nameInput = key;
			const placeholder = inputFields[key];

			return new LabledInput({
				id: key,
				name: nameInput,
				placeholder: placeholder,
				type: 'password',
				events: {
					blur: (event) => validateInput(event.target as HTMLInputElement),
					input: (event: Event) => inputValueHandler(event.target as HTMLInputElement),
				}
			});
		})

		this.children.profileFieldsEdit = new Form({
			className: 'profileEdit-form',
			data: [
				...inputLabled,
				new Button({
					className: 'btn-profileEdit',
					color: 'primary',
					type: 'submit',
					data: 'Сохранить',
				})
			],
			events: {
				submit: (event: Event) => {
					formDataSubmitHandler({
						event,
						handler: UserController.changeUserPassword,
						selector: '.profileEdit-form',
						isCheckInputs: true,
						action: () => Router.getInstanse().go(ROUTES.profile.path),
					});
				},
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}

const withPage = connect<IPasswordEditProps>((state: TState) => {
	if (state['user'] !== undefined) {
		return {
			UserName: state.user.display_name,
			userAvatar: ProfileUserAvatar(state),
		}
	} else {
		return {
			UserName: '',
			profileFieldsEdit: []
		};
	}
})

export const PasswordEditPage = withPage(PasswordEdit);
