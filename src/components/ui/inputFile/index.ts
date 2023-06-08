import Block from "../../../utils/Block";
import Input from "../input";
import template from './inputFile.hbs'
import './inputFile.scss';


interface IInputFile {
	className?: string;
	color?: 'primary' | 'secondary' | 'light';
	type?: string;
	id: string;
	name: string;
	placeholderText: string;
	isAcceptImage?: boolean;
	events?: {
		change?: (e: Event) => void;
	};
}

const defaultInputFileHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (target && target.files) {
		const labelId = target.getAttribute('aria-label');
		if (labelId) {
			const label = document.getElementById(labelId);
			if (label) label.textContent = target.files[0].name;
		}
	}
};

export class InputFile extends Block<IInputFile> {
	constructor(props: IInputFile) {
		super('div', props);
		this.inputFileClassName = this.inputFileClassName.bind(this);
	}

	inputFileClassName() {
		const className = ['input-file-container'];
		if (this.props.className) className.push(this.props.className);
		return className;
	}

	init() {
		this.element!.classList.add(...this.inputFileClassName())

		this.children.input = new Input({
			className: 'input-file-container__input',
			id: this.props.id,
			name: this.props.name,
			type: this.props.type ?? 'file',
			accept: 'image/*',
			attr: ['aria-label', `label-${this.props.id}`],
			events: {
				change: this.props.events?.change ?? defaultInputFileHandler
			}
		});

	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props)
	}
}
