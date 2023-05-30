import { TSignUpData } from "../../types";
import { ROUTES } from "../../utils/constants";
import { formDataToObject } from "../../utils/formDataToObject";
import { AuthAPI } from "../api/authApi";
import Router from "../router";
import { store } from "../store";

const authAPI = new AuthAPI();

export class AuthController {
	static async signUp(formData: FormData) {
		const data = formDataToObject(formData) as TSignUpData;
		try {
			const result = await authAPI.signUp(data);
			if (result.status === 200) {
				AuthController.getInfo();
				return result;
			}
		} catch (error) {
			return error
		}
	}

	static async checkUser() {
		return authAPI
			.getUserInfo()
			.then((response) => response)
			.catch((error) => error);
	}

	static async signIn(formData: FormData) {
		const data = formDataToObject(formData) as TSignUpData;
		try {
			const result = await authAPI.signIn(data);
			if (result.status === 200) {
				AuthController.getInfo();
				return result;
			}
		} catch (error) {
			return error
		}
	}

	static async getInfo() {
		return authAPI.getUserInfo()
			.then((response) => {
				store.set('user', response.response);
				return response;
			})
			.catch((error) => error);
	}

	static async logout() {
		return authAPI.logout()
			.then(() => {
				Router.getInstanse().go(ROUTES.home.path);
				const { user } = store.getState();
				if (user) {
					store.clear();
				}
			})
			.catch((error) => {
				return error;
			});
	}

}
