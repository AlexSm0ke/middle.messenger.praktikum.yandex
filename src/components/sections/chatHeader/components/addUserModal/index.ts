import { ChatController } from "../../../../../core/controllers/chatController";
import { store } from "../../../../../core/store";
import { IChatUser, IUser, TActiveChat } from "../../../../../types";
import { API_RESOURCES_PATH } from "../../../../../utils/constants";
import { render } from "../../../../../utils/renderDom";
import { sortUserByLogin } from "../../../../../utils/sortUserByLogin";
import Avatar from "../../../../ui/avatar";
import { Button } from "../../../../ui/button";
import DivBlock from "../../../../ui/div";
import { Form } from "../../../../ui/form";
import { IconAdd } from "../../../../ui/icon";
import Image from "../../../../ui/image";
import Input from "../../../../ui/input";
import List from "../../../../ui/list";
import { Modal } from "../../../../ui/modal";
import Text from "../../../../ui/text";

const addUser = (event: Event, item: IChatUser) => {
	const state = store.getState();
	const activeChat = state.activeChat as TActiveChat;
	if (activeChat.users.length < 10) {
		ChatController.addUserToChat(item.id, activeChat.id)
			.then((res) => {
				if (res) {
					if (res.status === 200) {
						const { target } = event;
						if (target) {

							const listItem = (target as HTMLElement).closest(
								'.list-item'
							);
							const infoItem = (target as HTMLElement).closest(
								'.user-list__info-item__addition'
							);
							if (listItem && infoItem) {
								const infoItemSuccess = new DivBlock({
									className: 'user-list__info-item__addition',
									data: 'Успех'
								}).getContent();
								infoItem.replaceWith(infoItemSuccess!);
							}
						}
					}
				} else {
					alert('Произошла ошибка, попробуйте еще раз')
				}
			});
	} else {
		alert('В чат нельзя добавить больше 10 пользователей')
	}
};

const infoItemAdditionIcon = (
	chatUserEntries: IChatUser | undefined,
	item: IChatUser
) =>
	chatUserEntries
		? new DivBlock({
			className: 'user-list__info-item__addition',
			data: 'Успех',
		})
		: new DivBlock({
			className: ['user-list__info-item__addition', 'action-item'],
			data: new IconAdd({
				size: 'icon-m',
			}),
			events: {
				click: (event: Event) => addUser(event, item),
			},
		});

const getFoundUserList = (foundUsers: IChatUser[]) => {
	const { user, activeChat } = store.getState();
	let foundUserList = new DivBlock({
		className: 'user-list-empty',
		data: 'Пользователь не найден',
	});

	if (!user || !activeChat) return;

	if (foundUsers.length > 0) {
		sortUserByLogin(foundUsers);

		foundUserList = new DivBlock({
			data: [
				new DivBlock({
					data: new DivBlock({
						className: 'user-list__header',
						data: [
							new DivBlock({
								className: 'user-list__header__title',
								data: 'Список пользователей',
							}),
						],
					}),
				}),
				new DivBlock({
					data: new List({
						className: 'user-list',
						isFlush: true,
						isFluid: true,
						data: foundUsers.map((item) => {
							const userListInfoItem = [
								new DivBlock({
									className: 'user-block',
									data: [
										item.avatar
											? new Avatar({
												data: new Image({
													src:
														API_RESOURCES_PATH +
														item.avatar,
												}),
											})
											: new Avatar({}),
										new DivBlock({
											className: 'user-block__name',
											data: new Text({
												data: item.login,
											}),
										}),
									],
								}),
							];

							const chatUserEntries = (
								activeChat as TActiveChat
							).users.find(
								(activeChatUser: IChatUser) =>
									activeChatUser.id === item.id
							);

							return new DivBlock({
								className: 'user-list__info-item',
								data: [
									...userListInfoItem,
									infoItemAdditionIcon(chatUserEntries, item),
								],
							});
						}),
					}),
				}),
			],
		});
	}
	render('#foundUserList', foundUserList);
};

const searchUser = (event: Event) => {
	event.preventDefault();
	const { target } = event;
	if (target && target instanceof HTMLFormElement) {
		const formData = new FormData(target);
		const login = formData.get('login') as string;
		if (login) {
			ChatController.getUsersByLogin(login).then((res) => {
				if (res) {
					if (res.status === 200) {
						const foundUserList =
							document.querySelector('#foundUserList');
						if (
							foundUserList &&
							foundUserList.innerHTML.trim() !== ''
						) {
							foundUserList.textContent = '';
						}
						getFoundUserList(res.response);
					}
				} else {
					alert('Произошла ошибка, попробуйте еще раз')
				}
			});
		}
	}
};

export const AddUserModal = () => {
	const modal = new Modal({
		id: 'addNewUserModal',
		title: 'Добавление пользователя',
		data: new DivBlock({
			id: 'addNewUserContainer',
			data: [
				new Form({
					className: 'add-value__form',
					data: [
						new DivBlock({
							className: 'add-value__form__input-group',
							data: new Input({
								className: 'input-newChat',
								id: 'addNewUser',
								name: 'login',
								placeholder: 'Логин пользователя',
							}),
						}),
						new Button({
							color: 'primary',
							isFluid: true,
							size: 'lg',
							type: 'submit',
							data: 'Найти',
						}),
					],
					events: {
						submit: searchUser,
					},
				}),
				new DivBlock({
					id: 'foundUserList',
					data: '',
				}),
			],
		}),
	});

	render('#modal-root', modal);
	modal.show();
};
