import Block from '../../../utils/Block';
import './icon.scss';
import logout from './icons/logout.hbs'
import profile from './icons/profile.hbs';
import arrowLeft from './icons/arrowLeft.hbs';
import newChat from './icons/newChat.hbs';
import dots from './icons/dots.hbs';

interface IIcon {
	size?: 'icon-xs' | 'icon-m' | 'icon-lg' | 'icon-xl' | 'icon-xxl';
	color?: 'icon-white' | 'icon-light' | 'icon-dark' | 'icon-primary' | 'icon-secondary' | 'icon-success';
	className?: string;
}

class IconBlock extends Block {
	constructor(props?: IIcon) {
		super('div', props);
		this.iconClassName = this.iconClassName.bind(this);
	}

	iconClassName() {
		let className = ['icon'];
		if (this.props.size) className.push(this.props.size)
		if (this.props.color) className.push(this.props.color)
		if (this.props.className) className.push(this.props.className)
		return className;
	}

}

export class IconLogout extends IconBlock {

	init(): void {
		this.element!.classList.add(...this.iconClassName());
	}
	render() {
		return this.compile(logout, this.props);
	}
}

export class IconProfile extends IconBlock {

	init(): void {
		this.element!.classList.add(...this.iconClassName());
	}
	render() {
		return this.compile(profile, this.props);
	}
}

export class IconArrowLeft extends IconBlock {

	init(): void {
		this.element!.classList.add(...this.iconClassName());
	}

	render() {
		return this.compile(arrowLeft, this.props);
	}
}

export class IconNewChat extends IconBlock {

	init(): void {
		this.element!.classList.add(...this.iconClassName());
	}

	render() {
		return this.compile(newChat, this.props);
	}
}

export class IconDots extends IconBlock {

	init(): void {
		this.element!.classList.add(...this.iconClassName());
	}

	render() {
		return this.compile(dots, this.props);
	}
}
