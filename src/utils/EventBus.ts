type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P];


export class EventBus<
	E extends Record<string, string> = Record<string, string>,
	Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
	private readonly listeners: Record<string, Array<() => void>> = {};

	on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event]?.push(callback);
	}

	off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			listener => listener !== callback
		);
	}

	emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
		if (!this.listeners[event]) {
			throw new Event(`Нет события: ${event}`);
		}

		this.listeners[event]!.forEach((listener) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			listener(...args);
		});
	}
}
