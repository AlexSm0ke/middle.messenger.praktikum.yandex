
import { Button } from "../../components/ui/button";
import Image from "../../components/ui/image";
import { LabledInput } from "../../components/ui/LabledInput";
import Sidebar from "../../components/ui/sidebar";
import Block from "../../utils/Block";
import template from "./profileEdit.hbs";
import { inputValueHandler, validateInput } from '../../utils/validations';
import './profileEdit.scss';
import { TState } from "../../core/store";
import { profileFields } from "../profile";
import { connect } from "../../core/store/connect";
import { IconArrowLeft } from "../../components/ui/icon";
import { AuthController } from "../../core/controllers/authController";
import { formDataSubmitHandler } from "../../utils/formHandler";
import { ROUTES } from "../../utils/constants";
import Router from "../../core/router";
import { UserController } from "../../core/controllers/userController";
import { Form } from "../../components/ui/form";

interface IProfileEditProps {
	userName: string;
	profileFieldsEdit: Block;

}

const getUserDataListEdit = (state: TState): Block => {
	let inputFields: Block[] | [] = [];
	if (Object.keys(state).length !== 0 && state.user) {
		inputFields = Object.keys(profileFields).map((key) => {
			const title = profileFields[key];
			const value = state.user?.[key] ?? '';

			return new LabledInput({
				id: key,
				name: key,
				placeholder: title,
				value: value,
				events: {
					blur: (event) => validateInput(event.target as HTMLInputElement),
					input: (event: Event) => inputValueHandler(event.target as HTMLInputElement),
				}
			});
		})
	}

	return new Form({
		className: 'profileEdit-form',
		data: [
			...inputFields,
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
					handler: UserController.changeProfile,
					selector: '.profileEdit-form',
					isCheckInputs: true,
					action: () => Router.getInstanse().go(ROUTES.profile.path),
				});
			},
		}

	})
}

class ProfileEdit extends Block<IProfileEditProps> {

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

		this.children.buttonSave = new Button({
			className: 'btn-primary',
			type: 'submit',
			data: 'Сохранить',
			events: {
				submit: (event: Event) => {
					formDataSubmitHandler({
						event,
						handler: UserController.changeProfile,
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

const withPage = connect<IProfileEditProps>((state: TState) => {
	if (state['user'] !== undefined) {
		return {
			UserName: state.user.display_name,
			profileFieldsEdit: getUserDataListEdit(state)
		}
	} else {
		return {
			UserName: '',
			profileFieldsEdit: []
		};
	}
})

export const ProfileEditPage = withPage(ProfileEdit);



