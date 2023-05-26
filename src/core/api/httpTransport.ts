// Utils
import { queryStringify } from '../../utils/queryStringify';

type RequestOptions = {
	method?: METHODS;
	timeout?: number;
	headers?: { [key: string]: string };
	data?: any;
};

enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type HTTPRequest = (
	url: string,
	options?: RequestOptions,
	timeout?: number
) => Promise<XMLHttpRequest>;

export class HTTPTransport {
	get: HTTPRequest = (url, options = {}) => {
		const query = options.data
			? url + queryStringify(options.data as { [key: string]: string })
			: url;
		return this.request(query, { ...options, method: METHODS.GET }, options.timeout);
	};

	post: HTTPRequest = (url, options = {}) =>
		this.request(url, { ...options, method: METHODS.POST }, options.timeout);

	put: HTTPRequest = (url, options = {}) =>
		this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

	delete: HTTPRequest = (url, options = {}) =>
		this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);

	request: HTTPRequest = (
		url,
		options = { method: METHODS.GET },
		timeout = 5000
	) => {
		const { headers = {}, method, data } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();

			xhr.open(method, url);
			xhr.responseType = "json";
			xhr.withCredentials = true;

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(xhr);
				} else {
					reject({
						status: xhr.status,
						statusText: xhr.statusText,
					});
				}
			};

			xhr.onerror = reject;
			xhr.onabort = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;
		});
	};
}
