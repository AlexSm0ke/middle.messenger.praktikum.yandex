import Block from "../../../utils/Block";
import template from "./dropdown.hbs";
import "./dropdown.scss";
import { Button } from "../button";

interface IDropdown {
	className?: string;
	id?: string;
	dropdownButtonSize?: "sm" | "lg" | "xl";
	dropdownButtonColor?: "primary" | "secondary" | "light";
	dropdownButtonIsFluid?: boolean;
	dropdownButtonIsCircle?: boolean;
	dropdownButtonIsSquare?: boolean;
	dropdownButtonIsRound?: boolean;
	dropdownButtonIsOutline?: boolean;
	dropdownButtonIsLink?: boolean;
	dropdownButtonContent: Block | string;
	dropdownMenuContent: Block | string;
}

const dropdownHide = () => {
	const dropdowns: NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown');
	dropdowns.forEach((dropdown: HTMLElement) => {
		if (dropdown.classList.contains('show')) {
			let button = <HTMLElement>dropdown.querySelector('#dropdownMenuButton');
			button.classList.remove('active');
			dropdown.classList.remove('show');
		}
	});
	window.removeEventListener('click', dropdownHidehandler);
}

const dropdownHidehandler = (event: Event) => {
	const target = event.target as HTMLElement;
	if (target.closest('.dropdown-menu') || target.closest('#dropdownMenuButton')) {
		if (!target.closest('.dropdown-item')) {
			return;
		}
	};

	dropdownHide();
};

const dropdownHandler = (event: Event) => {
	const button = event.currentTarget as HTMLElement;
	const dropdown = button.closest('.dropdown');
	if (dropdown) {
		if (dropdown.classList.contains('show')) {
			button.classList.remove('active');
			dropdown.classList.remove('show');
			window.removeEventListener('click', dropdownHidehandler);
		} else {
			dropdownHide();
			button.classList.add('active');
			dropdown.classList.add('show');
			window.addEventListener('click', dropdownHidehandler);
		}
	};
};

class Dropdown extends Block<IDropdown> {
	constructor(props: IDropdown) {
		super('div', props)
		this.dropdownClassName = this.dropdownClassName.bind(this);
	}

	dropdownClassName() {
		let className = ['dropdown'];
		if (this.props.className) className.push(this.props.className);
		return className;
	}

	init() {
		this.element!.classList.add(...this.dropdownClassName());
		if (this.props.id) this.element!.setAttribute('id', this.props.id);
		this.children.dropdownButton = new Button({
			id: "dropdownMenuButton",
			size: this.props.dropdownButtonSize,
			color: this.props.dropdownButtonColor,
			isFluid: this.props.dropdownButtonIsFluid,
			isCircle: this.props.dropdownButtonIsCircle,
			isSquare: this.props.dropdownButtonIsSquare,
			isRound: this.props.dropdownButtonIsRound,
			isOutline: this.props.dropdownButtonIsOutline,
			isLink: this.props.dropdownButtonIsOutline,
			data: this.props.dropdownButtonContent,
			events: {
				click: dropdownHandler
			}
		})
	}


	render() {
		return this.compile(template, this.props)
	}
}

export default Dropdown
