import Block from "../../../utils/Block";
import template from "./list.hbs";
import "./list.scss";

interface IList {
	isFlush?: boolean;
	isFluid?: boolean;
	className?: string;
	data: Block[] | string[];
}

class List extends Block<IList> {
	constructor(props: IList) {
		super('ul', props);
	}

	listClassName() {
		let className = ['list'];
		if (this.props.isFlush) className.push('list-flush');
		if (this.props.isFluid) className.push('list-fluid');
		if (this.props.className) className.push(this.props.className);
		return className;
	}

	init() {
		this.element?.classList.add(...this.listClassName());
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default List;
