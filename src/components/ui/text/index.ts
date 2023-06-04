
import Block from "../../../utils/Block";
import template from "./text.hbs";

interface IText {
	className?: string;
	data?: Block | string;
};

class Text extends Block<IText> {
	constructor(props: IText) {
		super('span', props);

	}

	init() {
		if (this.props.className) this.element!.classList.add(this.props.className);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Text
