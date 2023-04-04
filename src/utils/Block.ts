import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";
import { TemplateDelegate } from "handlebars";

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render"
	} as const;

	public id = nanoid(6);
	protected props: P;
	public children: Record<string, Block | Block[]>;
	private _eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	private _meta: { tagName: string, props: any };

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(tagName: string = "div", propsWhithChildren: P) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildrenAndProps(propsWhithChildren);

		this._meta = {
			tagName,
			props
		};

		this.children = children;
		this.props = this._makePropsProxy(props);

		this._eventBus = () => eventBus;

		// регистрируем 
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildrenAndProps(childrenProps: P): any {
		const props: Record<string, any> = {};
		const children: Record<string, Block | []> = {};

		Object.entries(childrenProps).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				children[key] = [];
				props[key] = [];
				value.forEach((obj) => {
					if (obj instanceof Block) {
						(children[key] as Array<Block<any>>).push(obj);
					} else {
						(props[key] as Array<Block<any>>).push(obj);
					}
				})
			} else if (value instanceof Block) {
				children[key as string] = value;
			} else {
				props[key] = value;
			};

		})
		return { props: props as P, children };
	}

	// обрабатывает и добавляет все ивенты
	_addEvents() {
		const { events = {} } = this.props as P & { events: Record<string, () => void> };

		Object.keys(events).forEach(eventName => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props as P & { events: Record<string, () => void> };

		if (!events || !this._element) {
			return;
		}

		Object.keys(events).forEach(eventName => {
			this._element!.removeEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	private _init() {
		this._createResources();
		this.init();
		this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {

	}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() { }

	public dispatchComponentDidMount() {
		this._eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach(child => {
			if (Array.isArray(child)) {
				child.forEach(ch => ch.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});
	}

	private _componentDidUpdate(oldProps: any, newProps: any) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (response) {
			this._render();
		}
	}

	protected componentDidUpdate(oldProps: any, newProps: any) {
		return true;
	}

	setProps = (nextProps: any) => {
		if (!nextProps) {
			return;
		}

		const oldValue = { ...this.props };
		const { children, props } = this._getChildrenAndProps(nextProps);

		if (Object.values(children).length) {
			Object.assign(this.children, children);
		}
		if (Object.values(props).length) {
			Object.assign(this.props, props);
		}

		this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
	};

	get element() {
		return this._element;
	};

	private _render() {
		const fragment = this.render();
		// this._removeEvents();
		this.element!.innerHTML = '';
		this.element!.append(fragment);
		this._addEvents();
	}

	protected compile(template: (context: any) => string, context: any) {
		const contextAndStubs = { ...context };

		Object.entries(this.children).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
			} else {
				contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
			}
		});

		const html = template(contextAndStubs);

		const temp = document.createElement('template');

		temp.innerHTML = html;

		const replaceStub = (component: Block) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.getContent()!);
		}

		Object.entries(this.children).forEach(([_, component]) => {
			if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
		});

		return temp.content;
	}

	// Переопределяется пользователем. Необходимо вернуть разметку
	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: any) {
		// Ещё один способ передачи this, но он больше не применяется с приходом ES6+
		const self = this;

		// Здесь вам предстоит реализовать метод
		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},

			set(target, prop, value) {
				const oldTarget = { ...target };

				target[prop] = value;

				// Запускаем обновление компоненты
				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
				self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			}
		});
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}

	show() {
		this.getContent()!.style.display = "block";
	}

	hide() {
		this.getContent()!.style.display = "none";
	}
}

export default Block;
