import { store, StoreEvents, TState } from '.';
import Block from '../../utils/Block';
import { isEqual } from '../../utils/isEqual';
// Utils

export function connect<P extends TProps>(mapStateToProps: (state: TState) => TState) {
	return function (Component: typeof Block<P>) {
		return class extends Component {
			constructor(props: P) {
				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());
				super('div', { ...props, ...state } as P);

				// подписываемся на событие
				store.on(StoreEvents.Updated, () => {
					// при обновлении получаем новое состояние
					const newState = mapStateToProps(store.getState());

					// если что-то из используемых данных поменялось, обновляем компонент
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					// не забываем сохранить новое состояние
					state = newState;
				});
			}
		};
	};
}
