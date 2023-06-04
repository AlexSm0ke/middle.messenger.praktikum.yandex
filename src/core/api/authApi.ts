import { HTTPTransport } from './httpTransport';
import { API_ENDPOINTS } from '../../utils/constants';
import { TSignUpData } from '../../types/index';


export class AuthAPI extends HTTPTransport {
	contentType = 'application/json; charset=utf-8';

	public signUp(data: TSignUpData): Promise<XMLHttpRequest> {
		return this.post(API_ENDPOINTS.auth.signUp, {
			data: JSON.stringify(data),
			headers: { 'Content-Type': this.contentType },
		});
	}

	public getUserInfo(): Promise<XMLHttpRequest> {
		return this.get(API_ENDPOINTS.auth.user);
	}

	public signIn(data: TSignUpData): Promise<XMLHttpRequest> {
		return this.post(API_ENDPOINTS.auth.signIn, {
			data: JSON.stringify(data),
			headers: { 'Content-Type': this.contentType },
		});
	}

	public logout(): Promise<XMLHttpRequest> {
		return this.post(API_ENDPOINTS.auth.logout);
	}
}
