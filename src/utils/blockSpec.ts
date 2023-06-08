import { assert } from "chai";
import Block from "./Block";
import template from './blockSpec.hbs'

interface ITestComponent {
	className?: string;
	data?: Block | string;
}

export class TestComponent extends Block<ITestComponent> {
	constructor(props: ITestComponent) {
		super('div', props);
	}

	init() {
		if (this.props.className) this.element.classList.add(this.props.className)
	}

	render() {
		return this.compile(template, this.props);
	}
}

describe("Block ", () => {
	it("getContent should return block element", () => {
		const block = new TestComponent({});
		assert.equal(block.getContent(), block.element);
	});

	it("should changes after block props changed", () => {
		const block = new TestComponent({
			data: "text1",
		});

		assert.equal(block.getContent().innerHTML, "text1");

		block.setProps({
			data: "text2",
		});

		assert.equal(block.getContent().innerHTML, "text2");
	});

	it("should set custom class name", () => {
		const className = "testClassName";

		const block = new TestComponent({
			className: className
		});

		assert.equal(block.getContent().className, className);
	});
});
