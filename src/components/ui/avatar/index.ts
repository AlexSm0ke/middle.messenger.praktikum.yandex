import Block from "../../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.scss";

interface IAvatar {
	size?: 'm' | 'lg';
	className?: string;
	data?: Block | string;
}

class Avatar extends Block<IAvatar> {
	constructor(props: IAvatar) {
		super('div', props);
		this.avatarClassName = this.avatarClassName.bind(this);
	}

	avatarClassName() {
		const className = ['avatar'];
		if (this.props.size) className.push(`avatar-${this.props.size}`);
		if (this.props.className) className.push(this.props.className);
		return className;
	}

	init() {
		this.element!.classList.add(...this.avatarClassName());
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Avatar
