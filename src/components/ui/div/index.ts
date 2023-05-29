import Block from '../../../utils/Block';
import template from './div.hbs';


interface IDivBlock {
	className?: string;
	data: Block | Block[] | string | string[];
	isArray?: boolean;
	events?: {
		click: (e: Event) => void;
	}
}

export class DivBlock extends Block<IDivBlock> {
	constructor(props: IDivBlock) {
		const isArray = Array.isArray(props.data);

		super('div', { ...props, isArray });
	}

	init() {
		this.element!.classList.add(this.props.className ?? '');

		// this.children.content = this.props.data;
		// const isArray: boolean = Array.isArray(this.props.data);
		// this.props.isArray = isArray;

	}

	render() {
		return this.compile(template, this.props)
	}
}

export default DivBlock
