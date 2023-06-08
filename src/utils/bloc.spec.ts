import { assert } from "chai";
import Block from "./Block";
import Handlebars from 'handlebars';

const template = "{{{ data }}}"
const compiled = Handlebars.compile(template);

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
		return this.compile(compiled, this.props);
	}
}

describe("Block ", () => {
	it("getContent должен вернуть элемент блока", () => {
		const block = new TestComponent({});
		assert.equal(block.getContent(), block.element);
	});

	it("Должен обновиться после изменения пропсов", () => {
		const block = new TestComponent({
			data: "text1",
		});

		assert.equal(block.getContent().innerHTML, "text1");

		block.setProps({
			data: "text2",
		});

		assert.equal(block.getContent().innerHTML, "text2");
	});

	it("должен установить кастомный classname", () => {
		const className = "testClassName";

		const block = new TestComponent({
			className: className
		});

		assert.equal(block.getContent().className, className);
	});
});
