import Block from '../../../utils/Block';
import template from './labledInput.hbs';
import Input from '../input';
import './labledInput.scss'

interface IProps {
	id: string;
	name: string;
	placeholder: string;
	value?: string;
	events?: {
		blur?: (e: Event) => void;
		focus?: (e: Event) => void;
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
			events: {
				blur: this.props.events?.blur,
				focus: this.props.events?.focus,
			}
		});

		this.element!.classList.add('form-group')
		// this.element!.setAttribute('for', this.props.id);

		this.element!.setAttribute('value', this.props.value ? this.props.value : '');
	}

	render() {
		return this.compile(template, this.props)
	}
}
