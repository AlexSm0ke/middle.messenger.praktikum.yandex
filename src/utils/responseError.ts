export const responseError = (response: Response) => {
	if (response.status === 400) {
		return 'Не удалось выполнить запрос';
	}

	if (response.status === 401) {
		return 'Не удалось пройти авторизацию';
	}

	if (response.status === 403) {
		return 'Нет доступа';
	}

	if (response.status === 404) {
		return 'Ресурс не найден. 404';
	}

	if (response.status >= 405 && response.status < 600) {
		return 'Возникла ошибка работы сервиса';
	}
};
