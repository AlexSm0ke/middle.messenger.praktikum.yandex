import { queryStringify } from "./queryStringify";

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>
type Options = {
	method?: METHOD;
	timeout?: number;
	headers?: { [key: string]: string };
	data?: { [key: string]: string };
};

enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

class HTTPTransport {
	get: HTTPMethod = (url, options = {}) => {
		const query = options.data ? url + queryStringify(options.data) : url;

		return this.request(query, { ...options, method: METHOD.GET }, options.timeout);
	};

	post: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
	};

	put: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
	};

	delete: HTTPMethod = (url, options = {}) => {
		return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
	};

	request = (
		url: string,
		options: Options = { method: METHOD.GET },
		timeout = 3000
	): Promise<XMLHttpRequest> => {
		const { headers = {}, method, data } = options;

		return new Promise((resolve, reject) => {
			if (!method) {
				reject('Метод отсутствует');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHOD.GET;

			xhr.open(method, url);
			xhr.responseType = 'json';

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = () => {
				resolve(xhr.response);
			};

			xhr.onerror = reject;
			xhr.onabort = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
