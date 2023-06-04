import { formDataToObject } from "../../utils/formDataToObject";
import {
    TUserProfileData,
    TUserPasswordData,
} from "../../types";
import { store } from '../store';
import { UserAPI } from '../api/userApi';

const userAPI = new UserAPI();

export class UserController {
    static async changeProfile(formData: FormData) {
        const data = formDataToObject(formData) as TUserProfileData;

        return userAPI
            .changeProfile(data)
            .then((response) => {
                store.set('user', response.response);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async changeUserPassword(formData: FormData) {
        const data = formDataToObject(formData) as TUserPasswordData;

        return userAPI
            .changePassword(data)
            .then((response) => response)
            .catch((error) => {
                return error;
            });
    }

    static async changeAvatar(formData: FormData) {
        return userAPI
            .changeAvatar(formData)
            .then((response) => {
                store.set('user', response.response);
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    static async getUsersByLogin(login: string) {
        return userAPI
            .searchUserByLogin({ login })
            .then((response) => response)
            .catch((error) => {
                return error;
            });
    }
}
