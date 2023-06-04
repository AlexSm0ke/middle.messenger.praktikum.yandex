import Block from '../../utils/Block'
import template from './singup.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';
import { inputValueHandler, validateInput } from '../../utils/validations';
import './singup.scss'
import Link from '../../components/ui/link';
import { ROUTES } from '../../utils/constants';
import { formDataSubmitHandler } from '../../utils/formHandler';
import { AuthController } from '../../core/controllers/authController';
import Router from '../../core/router';

interface ISingUpProps {
	title: string;
	events: {
		submit: (e: Event) => void;
	}
}

export class SingUpPage extends Block<ISingUpProps> {
	constructor(props: ISingUpProps) {
		super('div', props);
		this.element!.classList.add('container-singup');
	}

	protected init(): void {

		const inputEvents = {
			blur: (event: Event) => validateInput(event.target as HTMLInputElement),
			input: (event: Event) => inputValueHandler(event.target as HTMLInputElement),
		};

		const inputParametrs = [
			{
				id: "email",
				name: "email",
				placeholder: "Почта",
				events: { ...inputEvents }
			},
			{
				id: 'login',
				name: 'login',
				placeholder: 'Логин',
				events: { ...inputEvents }
			},
			{
				id: 'first_name',
				name: 'first_name',
				placeholder: 'Имя',
				events: { ...inputEvents }
			},
			{
				id: 'second_name',
				name: 'second_name',
				placeholder: 'Фамилия',
				events: { ...inputEvents }
			},
			{
				id: 'phone',
				name: 'phone',
				placeholder: 'Телефон',
				events: { ...inputEvents }
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль',
				events: { ...inputEvents }
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль (ещё раз)',
				events: { ...inputEvents }
			},
		];

		const buttonParametrs = [
			{
				className: 'btn-primary',
				data: 'ЗАРЕГИСТРИРОВАТЬСЯ',
				type: 'submit',
				events: {
					click: () => {
						console.log('ckick');
					},
				},
			},
			{
				data: new Link({
					data: 'ВОЙТИ',
					href: ROUTES.login.path,
				}),
			}
		]

		this.props.title = 'Регистрация'
		this.children.inputs = inputParametrs.map(input => new LabledInput(input));
		this.children.buttons = buttonParametrs.map(button => new Button(button));
		this.props.events = {
			submit: (event: Event) => {
				event.preventDefault();
				formDataSubmitHandler({
					event,
					handler: AuthController.signUp,
					selector: '.singup-form__inputs',
					isCheckInputs: true,
					action: () => Router.getInstanse().go(ROUTES.chat.path),
				});
			},
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}
