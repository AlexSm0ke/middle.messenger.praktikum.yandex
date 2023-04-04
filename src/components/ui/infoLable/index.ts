import template from "./infoLable.hbs";
import Block from "../../../utils/Block";
import './infoLable.scss'


interface IInfoLableProps {
	count?: string;
}

class InfoLable extends Block {
	constructor(props?: IInfoLableProps) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('info-label');
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default InfoLable;
