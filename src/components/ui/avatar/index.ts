import Block from "../../../utils/Block";
import template from "./avatar.hbs";
import "./avatar.scss";

interface IAvatar {
	// size?: "m" | "lg";
	content?: Block | string;
}

class Avatar extends Block {
	constructor(props?: IAvatar) {
		super('div', props);
		this.element!.classList.add('avatar');
	}

	init() {
		// console.log('this.props', this.props.content);

		// this.children.content = (this.props.content ? this.props.content : );
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Avatar
