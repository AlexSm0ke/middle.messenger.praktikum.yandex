import Block from "../../../utils/Block";
import template from "./image.hbs";
import "./image.scss";

interface IImage {
	className?: string;
	src?: string | URL;
	alt?: string;
}

class Image extends Block {
	constructor(props?: IImage) {
		super('img', props);
	}


	init() {
		this.element!.classList.add('img')
		if (this.props.className) this.element!.classList.add(this.props.className);

		if (this.props.src) this.element!.setAttribute('src', this.props.src);
		if (this.props.alt) this.element!.setAttribute('alt', this.props.alt);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Image
