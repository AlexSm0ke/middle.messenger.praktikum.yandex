import { TChatTitleData } from "../../types";
import { formDataToObject } from "../../utils/formDataToObject";
import { ChatAPI, TChatsQueryParams } from "../api/chatApi";
import { store } from "../store";

const chatAPI = new ChatAPI();

export class ChatController {
    static async getChats(params?: TChatsQueryParams) {
        return chatAPI
            .getChatList(params)
            .then((response) => {
                store.set('chats', response.response);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async getChatList(params?: TChatsQueryParams) {
        return chatAPI
            .getChatList(params)
            .then((response) => response)
            .catch((error) => {
                return error;
            });
    }

    static async addChat(formData: FormData) {
        const data = formDataToObject(formData) as TChatTitleData;

        return chatAPI
            .createNewChat(data)
            .then(() => chatAPI.getChatList())
            .then((response) => {
                store.set('chats', response.response);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async deleteChat(chatId: number) {
        return chatAPI
            .deleteChatById(chatId)
            .then(() => chatAPI.getChatList())
            .then((response) => {
                WebSocketController.deleteWebSocket();
                store.set('chats', response.response);
                store.delete(['activeChat']);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async getUsersByLogin(login: string) {
        return UserController.getUsersByLogin(login)
            .then((response) => response)
            .catch((error) => {
                errorHandler(error);
                return error;
            });
    }

    static async addUserToChat(id: number, chatId: number) {
        return chatAPI
            .addUsersToChat([id], chatId)
            .then((response) => {
                this.getChatUsersById(chatId);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async deleteUserfromChat(id: number, chatId: number) {
        return chatAPI
            .deleteUsersFromChat([id], chatId)
            .then((response) => {
                this.getChatUsersById(chatId);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async getChatById(chatId: number) {
        let chatUsers: IChatUser[];
        return chatAPI
            .getChatUsersById(chatId)
            .then((response) => {
                const chatUsersResponse = response.response;
                chatUsers = chatUsersResponse;
                return ChatController.getToken(chatId);
            })
            .then((response) => {
                const chatTokenResponse = response.response;
                const { token } = chatTokenResponse;
                if (token) {
                    store.set('activeChat', {
                        users: chatUsers,
                        id: chatId,
                        token,
                    });
                    WebSocketController.createNewWebSocket(token);
                }
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async getChatUsersById(chatId: number) {
        return chatAPI
            .getChatUsersById(chatId)
            .then((response) => {
                store.set('activeChat', {
                    users: response.response,
                    id: chatId,
                });
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

}
