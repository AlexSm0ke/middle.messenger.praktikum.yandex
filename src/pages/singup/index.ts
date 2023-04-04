import Block from '../../utils/Block'
import template from './singup.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';
import { validateInput } from '../../utils/validations';
import './singup.scss'
import Link from '../../components/ui/link';
import { routes } from '../../utils/constants';

interface ISingUpProps {
	// title: string;
}

class SingUpPage extends Block {
	constructor(props: ISingUpProps) {
		super('div', props);
		this.element!.classList.add('container-singup');
	}

	protected init(): void {

		const inputParametrs = [
			{
				id: "email",
				name: "email",
				placeholder: "Почта",
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'login',
				name: 'login',
				placeholder: 'Логин',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'first_name',
				name: 'first_name',
				placeholder: 'Имя',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'second_name',
				name: 'second_name',
				placeholder: 'Фамилия',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'phone',
				name: 'phone',
				placeholder: 'Телефон',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль (ещё раз)',
				events: {
					blur: (event: Event) => validateInput(event.target as HTMLInputElement)
				}
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
					href: routes.login.path,
				}),
				events: {
					click: () => {
						console.log('ckick');
					},
				},
			}
		]

		this.props.title = 'Регистрация'
		this.children.inputs = inputParametrs.map(input => new LabledInput(input));
		this.children.buttons = buttonParametrs.map(button => new Button(button));

		this.props.events = {
			submit: (event: Event) => {
				event.preventDefault();
				const target = event.target as HTMLInputElement;
				const inputFields = target.querySelectorAll('input');
				const data: { [key: string]: string; } = {};
				inputFields.forEach((current) => {
					if (current.name === 'email') {
						if (!validateInput(current)) {
							console.log('Адрес электронной почты введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'login') {
						if (!validateInput(current)) {
							console.log('Логин введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'first_name') {
						if (!validateInput(current)) {
							console.log('Имя введено неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'second_name') {
						if (!validateInput(current)) {
							console.log('Фамилия введена неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'phone') {
						if (!validateInput(current)) {
							console.log('Телефон введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'password') {
						if (!validateInput(current)) {
							console.log('Пароль введен неверно');
						} else {
							data[current.name] = current.value;
						}
					} else if (current.name === 'password_2') {
						if (!validateInput(current, document.querySelector("input[name=password]") as HTMLInputElement)) {
							console.log('Пароль и подтверждение пароля не совпадают');
						} else {
							data[current.name] = current.value;
						}
					} else {
						console.log('current', current);
						data[current.name] = current.value;
					}
				});
				console.log('data', data);
			},
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default SingUpPage;
