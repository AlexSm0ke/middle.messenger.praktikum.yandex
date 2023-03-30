import Block from '../../utils/Block'
import template from './login.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';

interface ILoginProps {
	// id: string;
	// name: string;
	// lable: string;
	// textError: string;
}

export class Login extends Block<ILoginProps> {
	constructor(props: ILoginProps) {
		super('div', props);
		this.element!.classList.add('container-login');
	}

	init() {

		this.children.buttonLogin = new Button({
			className: 'btn-primary',
			label: 'ВОЙТИ',
			type: 'button',
			events: {
				click: () => {
					console.log('ckick');
				},
			},
		})

		this.children.buttonSingUp = new Button({
			label: 'ЗАРЕГИСТРИРОВАТЬСЯ',
			type: 'button',
			events: {
				click: () => {
					console.log('ckick');
				},
			},
		})

		this.children.inputLogin = new LabledInput({
			id: 'login',
			name: 'login',
			placeholder: 'Логин',
			textError: 'Неверный логин. Введены некорректные символы',
		});

		this.children.inputPassword = new LabledInput({
			id: 'password',
			name: 'password',
			placeholder: 'Пароль',
			textError: 'Ошибка',
		});

	}

	render() {
		return this.compile(template, { ...this.props, title: 'Вход' })
	}
}
