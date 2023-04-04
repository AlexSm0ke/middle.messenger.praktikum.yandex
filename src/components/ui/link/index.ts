import Block from "../../../utils/Block";
import template from "./link.hbs";
// import "./link.scss";

interface IList {
	class?: string,
	href: string;
	data: Block | string;
}

class Link extends Block {
	constructor(props: IList) {
		super('a', props);
	}

	init() {
		this.element!.setAttribute('href', this.props.href);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Link;
