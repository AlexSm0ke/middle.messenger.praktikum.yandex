import Block from "../../../utils/Block";
import template from "./list.hbs";
import "./list.scss";

interface IList {
	class?: string,
	id?: string;
	data: Block[] | string[];
}

class List extends Block {
	constructor(props: IList) {
		super('ul', props);
	}

	init() {
		this.element?.classList.add('list');

		if (this.props.id)
			this.element!.setAttribute('id', this.props.id);


	}

	render() {
		return this.compile(template, this.props);
	}
}

export default List;
