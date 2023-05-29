import { API_ENDPOINTS } from '../../utils/constants';
import {
    TUserProfileData,
    TUserPasswordData,
    TUserLogin,
} from '../../types/index';
import { HTTPTransport } from './httpTransport';

export class UserAPI extends HTTPTransport {
    contentType = 'application/json; charset=utf-8';

    /**
     * Изменение данных пользователя
     * @param {TUserProfileData} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public changeProfile(data: TUserProfileData): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.users.changeProfile, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': this.contentType },
        });
    }

    /**
     * Изменение аватара пользователя
     * @param {FormData} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public changeAvatar(data: FormData): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.users.changeAvatar, { data });
    }

    /**
     * Изменение пароля пользователя
     * @param {TUserPasswordData} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public changePassword(data: TUserPasswordData): Promise<XMLHttpRequest> {
        return this.put(API_ENDPOINTS.users.changePassword, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': this.contentType },
        });
    }

    /**
     * Получение пользователя по id
     * @param {string} id
     * @returns {Promise<XMLHttpRequest>}
     */
    public getUserById(id: string): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.users.getUserById(id));
    }

    /**
     * Поиск пользователя по логину
     * @param {TUserLogin} login
     * @returns {Promise<XMLHttpRequest>}
     */
    public searchUserByLogin(login: TUserLogin): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.users.searchUserByLogin, {
            data: JSON.stringify(login),
            headers: { 'Content-Type': this.contentType },
        });
    }
}
