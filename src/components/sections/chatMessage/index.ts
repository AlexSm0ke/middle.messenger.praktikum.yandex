import { WebSocketController } from '../../../core/controllers/webSocketController';
import { TState } from '../../../core/store';
import { IChatMessage, IUser } from '../../../types';
import Block from '../../../utils/Block';
import { dateConvert } from '../../../utils/dateConvert';
import DivBlock from '../../ui/div';
import { Label2 } from '../../ui/label';
import Text from '../../ui/text';
import template from './ChatMessageArea.hbs';
import './ChatMessageArea.scss';
import { ChatMessage } from './component';


interface IChatMessageArea {
	state: TState;
}

const getDateTime = (user: IUser, item: IChatMessage) => {
	return item.user_id ? new Label2({
		color: item.user_id == `${user.id}` ? "label-primary" : "label-light",
		className: "chat-message__date-time",
		data: dateConvert(item.time)
	}) : null
};

const getMessages = (state: TState) => {
	const user = state.user as IUser;

	if (state.messages && (state.messages as IChatMessage[]).length !== 0) {
		return new DivBlock({
			// className: 'chat-container',
			data: [
				new DivBlock({
					className: 'chat-container__messages',
					data: (state.messages as IChatMessage[]).map((item) =>
						new ChatMessage({
							id: item.id,
							chat_id: item.chat_id,
							user_id: item.user_id,
							data: item.content,
							datetime: getDateTime(user, item),
							user: item.user_id && item.user_id == `${user.id}` ? true : false,
						})),
				}),
				new DivBlock({
					id: 'ahchor',
				}),
			],
			events: {
				scroll: (event: Event) => {
					const target = event.currentTarget;
					if (target && target instanceof HTMLElement) {
						const { scrollHeight } = target;
						const { scrollTop } = target;
						const { offsetHeight } = target;
						if (scrollTop + offsetHeight === scrollHeight) {
							WebSocketController.getOldMessages();
						}
					}
				},
			},
		});
	}

	return new DivBlock({
		className: ['chat-container', 'empty'],
		// isFluid: true,
		data: new Text({
			className: 'text-dark',
			data: 'Сообщения отсутствуют',
		}),
	});
};

export class ChatMessageArea extends Block<IChatMessageArea> {
	constructor(props: IChatMessageArea) {
		super('div', props);
	}

	init() {
		this.element!.classList.add('chat-container');
		this.children.messages = getMessages(this.props.state)
	}

	render() {
		return this.compile(template, this.props);
	}
}
