import template from './button.hbs';
import Block from '../../../utils/Block';
import './button.scss'


interface ButtonProps {
	className?: string;
	id?: string;
	size?: 'sm' | 'lg' | 'xl';
	color?: 'primary' | 'secondary' | 'light';
	isOutline?: boolean;
	isLink?: boolean;
	isFluid?: boolean;
	isRound?: boolean;
	isCircle?: boolean;
	isSquare?: boolean;
	data?: Block | string;
	type?: string;
	events?: {
		click?: (e: Event) => void;
		submit?: (e: Event) => void;
	}
}

export class Button extends Block<ButtonProps> {
	constructor(props: ButtonProps) {
		super('button', props);
		this.buttonClassName = this.buttonClassName.bind(this);
	}

	buttonClassName() {
		const className = ['btn'];
		if (this.props.color) className.push(this.props.color);
		if (this.props.className) className.push(this.props.className);

		if (this.props.size) className.push(`btn-${this.props.size}`);
		if (this.props.isFluid) className.push('btn-fluid')
		if (this.props.isRound) className.push('btn-rounded')
		if (!this.props.isFluid && !this.props.isRound && this.props.isCircle) className.push('btn-circle')
		if (!this.props.isFluid && !this.props.isRound && !this.props.isCircle && this.props.isSquare) className.push('btn-square')
		if (this.props.isOutline) className.push('btn-outline')
		if (!this.props.isOutline && this.props.isLink) className.push('btn-link')
		if (this.props.color) className.push(`btn-${this.props.color}`)
		if (this.props.className) className.push(this.props.className)
		return className;
	}


	init() {
		this.element!.classList.add(...this.buttonClassName());
		if (this.props.id) this.element!.setAttribute('id', this.props.id)
		this.element?.setAttribute('type', this.props.type ? this.props.type : 'button')
	}

	render() {
		return this.compile(template, this.props)
	}
}

