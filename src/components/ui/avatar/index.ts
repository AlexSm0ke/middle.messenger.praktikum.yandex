import Block from "../../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.scss";

interface IAvatar {
	// size?: "m" | "lg";
	data?: Block | string;
}

class Avatar extends Block {
	constructor(props?: IAvatar) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('avatar');

		// console.log('this.props', this.props.data);

		// this.children.content = (this.props.data ? this.props.data : );
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Avatar
