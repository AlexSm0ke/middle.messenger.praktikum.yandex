
import { Button } from "../../components/ui/button";
import Image from "../../components/ui/image";
import { LabledInput } from "../../components/ui/LabledInput";
import Sidebar from "../../components/ui/sidebar";
import Block from "../../utils/Block";
import template from "./profileEdit.hbs";
import { validateInput } from '../../utils/validations';
import './profileEdit.scss';

interface IProfileEditProps {

}

export class ProfileEditPage extends Block {
	constructor(props: IProfileEditProps) {
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
		});

		this.children.avatar = new Image({
			src: 'images/back.phg',
			alt: 'назад',
		})

		this.props.userName = 'Aleksandr';

		const inputFields = [
			{
				id: 'email',
				name: 'email',
				placeholder: 'Почта',
				value: 'pochta@yandex.ru'
			},
			{
				id: 'login',
				name: 'login',
				placeholder: 'Логин',
				value: 'IvanTheBest'
			},
			{
				id: 'first_name',
				name: 'first_name',
				placeholder: 'Имя',
				value: 'Александр'
			},
			{
				id: 'second_name',
				name: 'second_name',
				placeholder: 'Фамилия',
				value: 'Птицын'
			},
			{
				id: 'display_name',
				name: 'display_name',
				placeholder: 'Имя в чате',
				value: 'Smoke'
			},
			{
				id: 'phone',
				name: 'phone',
				placeholder: 'Телефон',
				value: '+7 (909) 967 30 30'
			},
		]

		this.children.profileFieldsEdit = inputFields.map(field => {
			return new LabledInput({
				id: field.id,
				name: field.name,
				placeholder: field.placeholder,
				value: field.value,
				events: {
					blur: (event) => validateInput(event.target as HTMLInputElement)
				}
			});
		})

		this.children.buttonSave = new Button({
			className: 'btn-primary',
			type: 'submit',
			data: 'Сохранить',
			events: {
				submit: (e) => {
					e.preventDefault;
					console.log('Данные отправлены');
				}
			}
		})
	}

	render() {
		return this.compile(template, this.props)
	}
}


