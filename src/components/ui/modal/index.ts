import Block from "../../../utils/Block";
import { Button } from "../button";
import { IconClose } from "../icon";
import template from '../modal/modal.hbs';
import './modal.scss';

interface IModal {
	className?: string;
	id: string;
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
		modalRoot.innerHTML = '';
	}
};

const defaultModalHandler = (event: Event) => {
	if (event.target === event.currentTarget) {
		modalCloseHandler();
	}
};

export class Modal extends Block {
	constructor(props: IModal) {

		super('div', props);
		this.modalClassName = this.modalClassName.bind(this);
	}

	modalClassName() {
		let className = ['modal'];
		if (this.props.className !== undefined) className.push(this.props.className);
		return className;
	}

	init(): void {
		this.element!.classList.add(...this.modalClassName());
		// this.element!.style = 
		this.children.modalCloseButton = new Button({
			size: 'sm',
			// shape: 'square',
			id: 'modalCloseButton',
			data: new IconClose(),
			events: {
				click: this.props.events?.click ?? defaultModalHandler,
			},
		});
	}

	render() {
		return this.compile(template, this.props)
	}
}
