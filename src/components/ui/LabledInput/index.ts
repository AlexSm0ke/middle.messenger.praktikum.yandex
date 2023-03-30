import Block from '../../../utils/Block';
import template from './LabledInput.hbs';
import Input from '../input';

interface IProps {
	id: string;
	name: string;
	placeholder: string;
	textError?: string;
}

export class LabledInput extends Block<IProps> {
	constructor(props: IProps) {
		super('lable', props);
	}

	init(): void {
		const { id, name } = this.props;
		this.children.input = new Input({
			id,
			name,
		});

		this.element!.classList.add('label')
		// this.element!.setAttribute('for', this.props.id);
	}

	render() {
		return this.compile(template, this.props)
	}
}
