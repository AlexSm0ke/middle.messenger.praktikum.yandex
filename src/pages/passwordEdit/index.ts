
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
import Router from "../../core/router";

interface IPasswordEditProps {
	userName: string
}

export class PasswordEditPage extends Block<IPasswordEditProps> {
	constructor(props: IPasswordEditProps) {
		super('div', props);
		this.element!.classList.add('pageProfile__container');
	}

	init() {
		this.children.sidebar = new Sidebar({
			data: new Image({
				src: 'images/back.phg',
				alt: 'назад',
			}),
			events: {
				click: () => {
					window.history.back();
				}
			}
		})

		this.children.avatar = new Image({
			src: 'images/back.phg',
			alt: 'назад',
		})

		this.props.userName = 'Aleksandr';

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

		// [
		// 	{
		// 		id: 'oldPassword',
		// 		name: 'oldPassword',
		// 		placeholder: 'Старый пароль',
		// 	},
		// 	{
		// 		id: 'newPassword',
		// 		name: 'newPassword',
		// 		placeholder: 'Новый пароль',
		// 	},
		// 	{
		// 		id: 'newPassword',
		// 		name: 'newPassword',
		// 		placeholder: 'Повторите новый пароль',
		// 	}
		// ]

		// this.children.profileFieldsEdit = inputFields.map(field => {
		// 	return new LabledInput({
		// 		id: field.id,
		// 		name: field.name,
		// 		placeholder: field.placeholder,
		// 		events: {
		// 			blur: (event) => validateInput(event.target as HTMLInputElement)
		// 		}
		// 	});
		// })

		// this.children.buttonSave = new Button({
		// 	className: 'btn-primary',
		// 	type: 'submit',
		// 	data: 'Сохранить',
		// 	events: {
		// 		submit: (e) => {
		// 			e.preventDefault;
		// 			console.log('Данные отправлены');
		// 		}
		// 	}
		// })

		// this.props.events = {
		// 	submit: (e: Event) => {
		// 		e.preventDefault();
		// 		const target = e.target as HTMLInputElement;
		// 		const inputFields = target.querySelectorAll('input');
		// 		const data: { [key: string]: string; } = {};

		// 		inputFields.forEach((current) => {
		// 			if (current.name === 'oldPassword') {
		// 				if (!validateInput(current)) {
		// 					console.log('Пароль введен неверно');
		// 				} else {
		// 					data['password'] = current.value;
		// 				}
		// 			} else if (current.name === 'password') {
		// 				if (!validateInput(current)) {
		// 					console.log('Пароль введен неверно');
		// 				} else {
		// 					data[current.name] = current.value;
		// 				}
		// 			} else if (current.name === 'password_2') {
		// 				if (!validateInput(current, document.querySelector("input[name=password]") as HTMLInputElement)) {
		// 					console.log('Пароль и подтверждение пароля не совпадают');
		// 				}
		// 			}
		// 		});
		// 		console.log('data', data);
		// 	}
		// }
	}

	render() {
		return this.compile(template, this.props)
	}
}
