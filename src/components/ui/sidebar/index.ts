
import Block from '../../../utils/Block';
import template from './sidebar.hbs'
import './sidebar.scss'


interface ISidebarProps {
	data: Block | URL;
	events: {
		click: (e: Event) => void;
	}
}

class Sidebar extends Block {
	constructor(props: ISidebarProps) {
		super('div', props);
		this.element!.classList.add('sideBar');
	}

	init() {

	}

	render() {
		return this.compile(template, this.props)
	}
}

export default Sidebar;
