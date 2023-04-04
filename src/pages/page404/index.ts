
import { Button } from "../../components/ui/button";
import Link from "../../components/ui/link";
import Block from "../../utils/Block";
import { routes } from "../../utils/constants";
import template from "./page404.hbs";
import './page404.scss';

interface IProfileProps {
	titleError?: string;
	textError?: string;
	data?: string
}

class ErrorPage extends Block {
	constructor(props: IProfileProps) {
		super('div', props);
		this.element!.classList.add('pageError__container');
	}

	init() {
		if (!this.props.titleError) this.props.titleError = '404';
		if (!this.props.textError) this.props.textError = 'Не туда попали';

		this.children.button = new Button({
			data: this.props.data ? this.props.data : new Link({
				data: 'Назад к чатам',
				href: routes.chat.path,
			}),
			className: 'primary'
		})
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default ErrorPage;
