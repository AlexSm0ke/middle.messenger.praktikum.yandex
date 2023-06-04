import Block from '../../../utils/Block';
import template from './labledInput.hbs';
import Input from '../input';
import './labledInput.scss'

interface IProps {
	id: string;
	name: string;
	placeholder: string;
	value?: string;
	type?: 'input' | 'password';
	events?: {
		blur?: (e: Event) => void;
		focus?: (e: Event) => void;
		input?: (e: Event) => void;
	}
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
			type: this.props.type ?? '',
			value: this.props.value ?? '',
			events: {
				blur: this.props.events?.blur,
				focus: this.props.events?.focus,
			}
		});

		this.element!.classList.add('form-group')
	}

	render() {
		return this.compile(template, this.props)
	}
}
