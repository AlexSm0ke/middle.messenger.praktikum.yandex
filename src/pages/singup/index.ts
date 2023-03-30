import Block from '../../utils/Block'
import template from './singup.hbs';
import { LabledInput } from '../../components/ui/LabledInput';
import { Button } from '../../components/ui/button';
import Input from '../../components/ui/input';

interface ISingUpProps {
	// title: string;
}



export class SingUp extends Block {
	constructor(props: ISingUpProps) {

		const inputParametrs = [
			{
				id: "email",
				name: "email",
				placeholder: "Почта",
			},
			{
				id: 'login',
				name: 'login',
				placeholder: 'Логин',
				textError: 'Неверный логин. Введены некорректные символы',
			},
			{
				id: 'first_name',
				name: 'first_name',
				placeholder: 'Имя',
			},
			{
				id: 'second_name',
				name: 'second_name',
				placeholder: 'Фамилия',
			},
			{
				id: 'phone',
				name: 'phone',
				placeholder: 'Телефон',
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль',
			},
			{
				id: 'password',
				name: 'password',
				placeholder: 'Пароль (ещё раз)',
			},
		];

		const buttonParametrs = [
			{
				className: 'btn-primary',
				label: 'ЗАРЕГИСТРИРОВАТЬСЯ',
				type: 'button',
				events: {
					click: () => {
						console.log('ckick');
					},
				},
			},
			{
				label: 'ВОЙТИ',
				type: 'button',
				events: {
					click: () => {
						console.log('ckick');
					},
				},
			}
		]

		const title = 'Регистрация';
		const inputs = inputParametrs.map(input => new LabledInput(input));
		console.log('inputs', inputs);

		const inputsw = new LabledInput(inputParametrs[0]);
		const buttons = buttonParametrs.map(button => new Button(button));

		super('div', { ...props, title, inputs, buttons, inputsw });
		this.element!.classList.add('container-singup');

	}

	render() {
		return this.compile(template, this.props);
	}
}
