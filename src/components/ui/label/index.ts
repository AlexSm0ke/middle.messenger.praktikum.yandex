import Block from '../../../utils/Block';
import template from './label.hbs';
import './label2.scss';

interface ILabel {
	className?: string;
	isCircle?: boolean;
	color?: 'label-primary' | 'label-secondary' | 'label-light';
	data: Block | string;
}

export class Label2 extends Block<ILabel> {
	constructor(props: ILabel) {
		super('div', props);
		this.labelClassName = this.labelClassName.bind(this);
	}

	labelClassName() {
		let className = ['label2'];
		if (this.props.className) className.push(this.props.className);
		if (this.props.isCircle) className.push('label-circle');
		if (this.props.color) className.push(this.props.color);
		return className;
	}

	init() {
		this.element!.classList.add(...this.labelClassName());
	}

	render() {
		return this.compile(template, this.props);
	}
}
