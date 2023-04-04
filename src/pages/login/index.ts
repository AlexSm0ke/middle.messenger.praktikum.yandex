import Block from '../../utils/Block'
import template from './login.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';
import { validateInput } from '../../utils/validations';
import './login.scss'
import Link from '../../components/ui/link';
import { routes } from '../../utils/constants';

interface ILoginProps {
	inputLogin?: Block;
	inputPassword?: Block;
	buttonLogin?: Block;
	buttonSingUp?: Block;
	events?: {
		submit: (e: Event) => void;
	}
}

class LoginPage extends Block {
	constructor(props?: ILoginProps) {
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
				href: routes.register.path,
			}),
			events: {
				click: () => {
					console.log('ckick');
				},
			},
		})

		this.props.events = {
			submit: (e: Event) => {
				e.preventDefault();
				const target = e.target as HTMLInputElement;
				const inputFields = target.querySelectorAll('input');
				const data: { [key: string]: string; } = {};

				inputFields.forEach((current) => {
					if (current.name === 'login') {
						if (!validateInput(current)) {
							console.log('Логин введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'password') {
						if (!validateInput(current)) {
							console.log('Пароль введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else {
						console.log('current', current);
						data[current.name] = current.value;
					}
				});
				console.log('data', data);
			}
		}
	}

	render() {
		return this.compile(template, { ...this.props, title: 'Вход' })
	}
}

export default LoginPage;
