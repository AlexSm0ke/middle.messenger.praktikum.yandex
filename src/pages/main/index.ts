import template from './main.hbs';
import { routes } from '../../utils/constants';

import Block from '../../utils/Block';
import List from '../../components/ui/list';
import Link from '../../components/ui/link';

interface IMain {
	data: Block;
}

class Main extends Block<IMain> {
	constructor(props: IMain) {
		super('div', props);
		this.element!.classList.add('container')
	}

	render() {
		return this.compile(template, this.props);
	}
}

const pages: { title: string, path: string }[] = [
	{ title: routes.login.title, path: routes.login.path },
	{ title: routes.register.title, path: routes.register.path },
	{ title: routes.chat.title, path: routes.chat.path },
	{ title: routes.profile.title, path: routes.profile.path },
	{ title: routes.profileEdit.title, path: routes.profileEdit.path },
	{ title: routes.error_404.title, path: routes.error_404.path },
	{ title: routes.error_500.title, path: routes.error_500.path }
];

const MainPage = new Main({
	data: new List({
		data: pages.map(link => (
			new Link({
				href: link.path,
				data: link.title
			})
		))
	})
});

export default MainPage;
