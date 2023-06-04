import Block from '../../../utils/Block';
import template from './div.hbs';


interface IDivBlock {
	className?: string | string[];
	data?: Block | Block[] | string | string[];
	isArray?: boolean;
	id?: string;
	events?: {
		click?: (e: Event) => void;
		scroll?: (e: Event) => void;
	}
}

export class DivBlock extends Block<IDivBlock> {
	constructor(props: IDivBlock) {
		const isArray = Array.isArray(props.data);

		super('div', { ...props, isArray });
	}

	init() {
		if (this.props.className && !Array.isArray(this.props.className)) {
			this.element!.classList.add(this.props.className)
		} else if (Array.isArray(this.props.className)) {
			this.element!.classList.add(...this.props.className)
		}

		if (this.props.id) this.element!.setAttribute('id', this.props.id);

		// this.children.content = this.props.data;
		// const isArray: boolean = Array.isArray(this.props.data);
		// this.props.isArray = isArray;

	}

	render() {
		return this.compile(template, this.props)
	}
}

export default DivBlock
