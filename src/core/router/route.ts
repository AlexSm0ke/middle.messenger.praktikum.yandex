import Block from '../../utils/Block';
import { isEqual } from '../../utils/isEqual';
import { render } from '../../utils/renderDom';

class Route {
	private _pathname: string;
	private _blockClass: any;
	// private _blockClass: typeof Block;
	private _block: Block | null;
	private _props: any;

	constructor(pathname: string, view: any, props: any) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
	}

	get pathname() {
		return this._pathname;
	}

	get props() {
		return this._props;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass(this._props);
		} else {
			this._block.show();
		}
		render(this._props.rootQuery, this._block!);
	}
}

export default Route;
