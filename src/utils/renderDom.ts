import Block from "./Block";

export const render = (elem: string, block: Block) => {
	const root = document.querySelector(elem);
	root!.appendChild(block.getContent() as HTMLElement);
	block.dispatchComponentDidMount();
	return root;
};

// export default render;
