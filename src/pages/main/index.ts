import template from './main.hbs';
import { ROUTES } from '../../utils/constants';

import Block from '../../utils/Block';
import List from '../../components/ui/list';
import Link from '../../components/ui/link';

interface IMain {
	data?: Block;
}

export class MainPage extends Block {
	constructor(props?: IMain) {
		super('div', props);
		this.element!.classList.add('container')
	}

	protected init(): void {
		const pages: { title: string, path: string }[] = [
			{ title: ROUTES.login.title, path: ROUTES.login.path },
			{ title: ROUTES.register.title, path: ROUTES.register.path },
			{ title: ROUTES.chat.title, path: ROUTES.chat.path },
			{ title: ROUTES.profile.title, path: ROUTES.profile.path },
			{ title: ROUTES.profileEdit.title, path: ROUTES.profileEdit.path },
			{ title: ROUTES.passwordEdit.title, path: ROUTES.passwordEdit.path },
			{ title: ROUTES.error_404.title, path: ROUTES.error_404.path },
			{ title: ROUTES.error_500.title, path: ROUTES.error_500.path }
		];

		this.children.data = new List({
			data: pages.map(link => (
				new Link({
					href: link.path,
					data: link.title
				})
			))
		})
	}

	render() {
		return this.compile(template, this.props);
	}
}
