import { store, StoreEvents, TState } from '.';
import Block from '../../utils/Block';
import { isEqual } from '../../utils/isEqual';
// Utils

export function connect(mapStateToProps: (state: TState) => any) {
	return function (Component: typeof Block) {
		return class extends Component {
			constructor(props: Record<string, unknown>) {
				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());
				super('div', { ...props, ...state });

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
