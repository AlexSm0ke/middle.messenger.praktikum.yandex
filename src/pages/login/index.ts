import Block from '../../utils/Block'
import template from './login.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';
import { validateInput } from '../../utils/validations';
import './login.scss'
import Link from '../../components/ui/link';
import { ROUTES } from '../../utils/constants';
import { formDataSubmitHandler } from '../../utils/formHandler';
import { AuthController } from '../../core/controllers/authController';
import Router from '../../core/router';

interface ILoginProps {
	inputLogin?: Block;
	inputPassword?: Block;
	buttonLogin?: Block;
	buttonSingUp?: Block;
	events?: {
		submit: (e: Event) => void;
	}
}

export class LoginPage extends Block<ILoginProps> {
	constructor(props: ILoginProps) {
		super('div', props);
		this.element!.classList.add('container-login');
	}

	init() {

		this.children.inputLogin = new LabledInput({
			id: 'login',
			name: 'login',
			placeholder: 'Логин',
			events: {
				blur: (event) => validateInput(event.target as HTMLInputElement)
			}
		});

		this.children.inputPassword = new LabledInput({
			id: 'password',
			name: 'password',
			placeholder: 'Пароль',
			events: {
				blur: (event) => validateInput(event.target as HTMLInputElement)
			}
		});

		this.children.buttonLogin = new Button({
			className: 'btn-primary',
			data: 'ВОЙТИ',
			type: 'submit'
		})

		this.children.buttonSingUp = new Button({
			data: new Link({
				data: 'ЗАРЕГИСТРИРОВАТЬСЯ',
				href: ROUTES.register.path,
			}),
			events: {
				click: () => {
					console.log('ckick');
				},
			},
		})

		this.props.events = {
			submit: (event: Event) => {
				formDataSubmitHandler({
					event: event,
					handler: AuthController.signIn,
					selector: ".login-form__inputs",
					isCheckInputs: true,
					action: () => Router.getInstanse().go(ROUTES.chat.path)
				});
			}
		}
	}

	render() {
		return this.compile(template, { ...this.props, title: 'Вход' })
	}
}

