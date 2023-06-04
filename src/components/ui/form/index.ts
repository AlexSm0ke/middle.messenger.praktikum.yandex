import Block from "../../../utils/Block";
import template from './form.hbs'

interface FormProps {
	className?: string;
	data: Block | Block[] | string | string[];
	events?: {
		submit?: (e: Event) => void;
	};
}

export class Form extends Block<FormProps> {
	constructor(props: FormProps) {
		super('form', props)
		this.formClassName = this.formClassName.bind(this);
	}

	formClassName() {
		let className = ['form'];
		if (this.props.className) className.push(this.props.className);
		return className;
	}

	init(): void {
		this.element!.classList.add(...this.formClassName());
	}

	render() {
		return this.compile(template, this.props);
	}

}
