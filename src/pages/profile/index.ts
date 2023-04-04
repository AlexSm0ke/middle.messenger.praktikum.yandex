import Avatar from "../../components/ui/avatar";
import Image from "../../components/ui/image";
import Sidebar from "../../components/ui/sidebar";
import Block from "../../utils/Block";
import { routes } from "../../utils/constants";
import template from "./profile.hbs";
import './profile.scss';

interface IProfileProps {

}

class Profile extends Block {
	constructor(props: IProfileProps) {
		super('div', props);
		this.element!.classList.add('pageProfile__container');
	}

	init() {
		this.children.sidebar = new Sidebar({
			data: new Image({
				src: 'images/back.phg',
				alt: 'назад',
			})
		});

		this.children.avatar = new Image({
			src: 'images/back.phg',
			alt: 'назад',
		})

		this.props.userName = 'Aleksandr';

		this.props.profileFields = [
			{
				nameField: 'Почта',
				data: 'pochta@yandex.ru'
			},
			{
				nameField: 'Логин',
				data: 'IvanTheBest'
			},
			{
				nameField: 'Имя',
				data: 'Александр'
			},
			{
				nameField: 'Фамилия',
				data: 'Птицын'
			},
			{
				nameField: 'Имя в чате',
				data: 'Smoke'
			},
			{
				nameField: 'Телефон',
				data: '+7 (909) 967 30 30'
			}
		];

		this.props.options = [
			{
				lable: 'Изменить данные',
				href: routes.profileEdit.path,
			},
			{
				lable: 'Изменить пароль',
			}
		]
	}

	render() {
		return this.compile(template, this.props)
	}
}

const ProfilePage = new Profile({});
export default ProfilePage;
