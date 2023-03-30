import Block from '../../../utils/Block';
import template from './div.hbs';


interface IDivBlock {
	className?: string;
	content: Block | Block[] | string;
	events?: {
		click: (e: Event) => void;
	}
}

export class DivBlock extends Block {
	constructor(props: IDivBlock) {
		const isArray = Array.isArray(props.content);
		console.log('props.content<><><><>', props.content);

		super('div', { ...props, isArray });
		this.element!.classList.add(this.props.className);
	}

	init() {
		// // this.children.content = this.props.content;
		// const isArray: boolean = Array.isArray(this.props.content);
		// this.props.isArray = isArray;

	}

	render() {
		return this.compile(template, this.props)
	}
}

export default DivBlock
