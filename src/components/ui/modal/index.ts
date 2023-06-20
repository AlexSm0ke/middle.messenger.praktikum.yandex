import Block from "../../../utils/Block";
import { Button } from "../button";
import { IconClose } from "../icon";
import template from './modal.hbs';
import './modal.scss';

interface IModal {
	id: string;
	className?: string;
	style?: string;
	iconClose?: Block | string;
	title?: string;
	data?: Block | string;
	events?: {
		click: (e: Event) => void;
	};
}

export const modalCloseHandler = () => {
	const modalRoot = document.getElementById('modal-root');
	if (modalRoot) {
		modalRoot.textContent = '';
	}
};

const defaultModalHandler = () => {
	modalCloseHandler();
};

export class Modal extends Block<IModal> {
	constructor(props: IModal) {

		super('div', props);
		this.modalClassName = this.modalClassName.bind(this);
	}

	modalClassName() {
		const className = ['modal'];
		if (this.props.className !== undefined) className.push(this.props.className);
		return className;
	}

	init(): void {
		this.element!.classList.add(...this.modalClassName());
		this.element!.setAttribute('id', this.id);
		this.children.modalCloseButton = new Button({
			size: 'sm',
			id: 'modalCloseButton',
			data: new IconClose({
				size: 'icon-m'
			}),
			events: {
				click: this.props.events?.click ?? defaultModalHandler,
			},
		});
	}

	render() {
		return this.compile(template, this.props)
	}
}
