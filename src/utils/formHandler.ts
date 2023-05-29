import { validateInput } from './validations';
import { responseError } from './responseError';

export const clearForm = (form: HTMLFormElement) => {
	const formInputs = form.querySelectorAll('input');

	formInputs.forEach((input: HTMLInputElement) => {
		input.value = '';
		input.setAttribute('value', input.value);
	});
};

export const removeErrorFormNotification = (selector: string) => {
	const node = document.querySelector(selector);
	if (node) {
		const parentNode = node?.parentElement;
		if (parentNode) {
			const textNode = parentNode.querySelector('.text-error');
			if (textNode) {
				textNode.remove();
			}
		}
	}
};

export const checkValidateInputs = (inputs: NodeList) =>
	Array.from(inputs).reduce((acc, input) =>
		acc && validateInput(input as HTMLInputElement),
		true
	);

export const checkInputs = (form: HTMLFormElement) => {
	const formInputs = form.querySelectorAll('input');
	const isValidateInputs = checkValidateInputs(formInputs);
	return isValidateInputs;
};

export const textNotification = (
	selector: string,
	message: string,
	style: 'base' | 'error' = 'base'
) => {
	const node = document.querySelector(selector);
	if (node) {
		const parentNode = node?.parentElement;
		if (parentNode) {
			let textNode = parentNode.querySelector(
				`.text-notification-${style}`
			);
			if (!textNode) {
				textNode = document.createElement('p');
				textNode.classList.add(`text-notification-${style}`);
				node.after(textNode);
			}
			textNode.innerHTML = message;
		}
	}
};

export const errorFormNotification = (selector: string, message: string) => {
	textNotification(selector, message, 'error');
};

export const formResponseErrorNotification = (
	res: Response,
	selector: string,
	customTextStatus: string
) => {
	const responseErrorStatus = responseError(res);
	errorFormNotification(selector, responseErrorStatus || customTextStatus);
};

export const formDataSubmitHandler = async (params: {
	event: Event;
	handler: (data: FormData) => Promise<any>;
	selector: string;
	isCheckInputs?: boolean;
	action?: () => void;
}) => {
	const { event, handler, selector, isCheckInputs, action } = params;

	event.preventDefault();
	const { target } = event;
	// debugger
	if (target && target instanceof HTMLFormElement) {
		if (isCheckInputs) {
			if (!checkInputs(target as HTMLFormElement)) {
				return;
			}
		}
		const formData = new FormData(target);
		const result = await handler(formData);
		if (result.status === 200) {
			if (action) action();
		} else {
			formResponseErrorNotification(result, selector, 'Произошла ошибка, попробуйте еще раз<><><>');
		}

	}
};
