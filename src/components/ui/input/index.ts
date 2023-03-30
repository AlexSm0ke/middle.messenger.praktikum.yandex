import Block from '../../../utils/Block';
import template from './input.hbs';

interface IProps {
	id: string;
	name: string;
	type?: string;
	placeholder?: string;
}

class Input extends Block<IProps> {
	constructor(props: IProps) {
		super('input', props);
	}

	init(): void {
		this.element!.setAttribute('id', this.props.id);
		this.element!.setAttribute('name', this.props.name);
		this.element!.setAttribute(
			'type',
			this.props.type ? this.props.type : 'text'
		);
		this.element!.setAttribute(
			'placeholder',
			this.props.placeholder ? this.props.placeholder : ' '
		);
	}

	render() {
		return this.compile(template, this.props)
	}
}

export default Input;

