import { ChatController } from "../../../../../core/controllers/chatController";
import { IChatUser, IUser } from "../../../../../types";
import { API_RESOURCES_PATH } from "../../../../../utils/constants";
import { render } from "../../../../../utils/renderDom";
import { responseError } from "../../../../../utils/responseError";
import { sortUserByLogin } from "../../../../../utils/sortUserByLogin";
import Avatar from "../../../../ui/avatar";
import DivBlock from "../../../../ui/div";
import { IconDelete } from "../../../../ui/icon";
import Image from "../../../../ui/image";
import List from "../../../../ui/list";
import { Modal } from "../../../../ui/modal";
import Text from "../../../../ui/text";

export const DeleteUserModal = (
    user: IUser,
    activeChatUsers: IChatUser[],
    activeChatId: number
) => {
    if (!user || !activeChatUsers || !activeChatId) return;

    sortUserByLogin(activeChatUsers);

    const adminUser = activeChatUsers.find((item) => item.role === 'admin');

    const modal = new Modal({
        id: 'chatUserListModal',
        title: 'Удалить пользователя',
        data: new DivBlock({
            id: 'chatUserListContainer',
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
                        data: activeChatUsers.map((item: IChatUser) => {
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

                            if (item.role === 'admin') {
                                userListInfoItem.push(
                                    new DivBlock({
                                        className: ['user-list__info-item__addition', 'text-dark'],
                                        data: 'admin',
                                    })
                                );
                            } else {
                                userListInfoItem.push(
                                    new DivBlock({
                                        className:
                                            ['user-list__info-item__addition', 'action-item'],
                                        data: new IconDelete({
                                            size: 'icon-m',
                                            color: 'icon-secondary',
                                        }),
                                        events: {
                                            click: (event) => {
                                                if (adminUser && adminUser.id === user.id) {
                                                    const confirmDelete =
                                                        confirm(
                                                            'Вы уверены, что хотите удалить пользователя из чата?'
                                                        );
                                                    if (confirmDelete) {
                                                        ChatController.deleteUserfromChat(
                                                            item.id,
                                                            activeChatId
                                                        ).then((res) => {
                                                            if (res) {
                                                                if (
                                                                    res.status ===
                                                                    200
                                                                ) {
                                                                    const {
                                                                        target,
                                                                    } = event;
                                                                    if (
                                                                        target
                                                                    ) {
                                                                        const parentNode =
                                                                            (
                                                                                target as HTMLElement
                                                                            ).closest(
                                                                                '.list-item'
                                                                            );
                                                                        if (
                                                                            parentNode
                                                                        )
                                                                            parentNode.remove();
                                                                    }
                                                                }
                                                            } else {
                                                                alert(responseError(res) || 'Произошла ошибка, попробуйте еще раз')
                                                            }
                                                        });
                                                    }
                                                } else {
                                                    alert('Для удаления пользователя нужны права админа')
                                                }
                                            },
                                        },
                                    })
                                );
                            }

                            return new DivBlock({
                                className: 'user-list__info-item',
                                data: userListInfoItem,
                            });
                        }),
                    }),
                }),
            ],
        }),
    });

    render('#modal-root', modal);
    modal.show();
};
