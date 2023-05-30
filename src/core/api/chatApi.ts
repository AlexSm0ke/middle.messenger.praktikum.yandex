import { API_ENDPOINTS } from '../../utils/constants';
import { TChatTitleData } from '../../types/index';
import { HTTPTransport } from './httpTransport';

export type TChatsQueryParams = {
    offset?: number;
    limit?: number;
    title?: string;
};

export class ChatAPI extends HTTPTransport {
    contentType = 'application/json; charset=utf-8';

    // Получение списка чатов
    public getChatList(data?: TChatsQueryParams): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.chats, { data });
    }

    // Создание нового чат
    public createNewChat(data: TChatTitleData): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.chats.chats, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': this.contentType },
        });
    }

    // Удаление чата по номеру chatId
    public deleteChatById(chatId: number): Promise<XMLHttpRequest> {
        return this.delete(API_ENDPOINTS.chats.chats, {
            data: JSON.stringify({ chatId }),
            headers: { 'Content-Type': this.contentType },
        });
    }

    // Получение пользователей чата по chatId
    public getChatUsersById(chatId: number): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.chatUsersById(chatId));
    }

    //Получение количества новых сообщений чата по chatId
    public getNewMessagesCount(chatId: string): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.chats.newMessagesCount(chatId));
    }

    // Добавление пользователей в чат
    public addUsersToChat(
        users: number[],
        chatId: number
    ): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.chats.chatsUsers, {
            data: JSON.stringify({ users, chatId }),
            headers: { 'Content-Type': this.contentType },
        });
    }

    // Удаление пользователей из чата
    public deleteUsersFromChat(
        users: number[],
        chatId: number
    ): Promise<XMLHttpRequest> {
        return this.delete(API_ENDPOINTS.chats.chatsUsers, {
            data: JSON.stringify({ users, chatId }),
            headers: { 'Content-Type': this.contentType },
        });
    }

    // Получение списка токенов пользователей чата
    public getChatToken(id: number): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.chats.getChatUsers(id));
    }
}
