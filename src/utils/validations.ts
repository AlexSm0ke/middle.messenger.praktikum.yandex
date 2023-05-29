export class ValidationForm {
	checkEmptyValue = (value: string): boolean => {
		return value !== '';
	}

	checkPassword = (value: string): boolean => {
		return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
	}

	checkPasswordConfirm = (value1: string, value2: string): boolean => {
		return value1 === value2;
	}

	checkLength = (min: number, max: number, value: string): boolean => {
		return value.length >= min && value.length <= max;
	}

	checkName = (value: string): boolean => {
		return /^[A-ZА-Я]+[A-Za-zа-яА-Я-]+$/.test(value);
	}

	checkPhone = (value: string): boolean => {
		return this.checkLength(10, 15, value) && /^[+]?[0-9]+$/.test(value);
	}

	checkLogin = (value: string): boolean => {
		return this.checkLength(4, 18, value);
	}

	checkEmail = (value: string): boolean => {
		return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value);
	}

	showError = (input: HTMLElement, selector: string, message = "Неверный формат"): void => {
		const parent = input.closest(selector);
		let errorElem = parent?.querySelector('[role="alert"]');
		if (!errorElem && parent) {
			const errorElem = document.createElement('span');
			const text = document.createTextNode(message);
			errorElem.appendChild(text);
			errorElem.classList.add('input-error');
			errorElem.setAttribute("role", "alert");
			parent.appendChild(errorElem);
		}
	};

	hideError = (input: HTMLElement, selector: string): void => {
		const parent = input.closest(selector);
		const errorElem = parent?.querySelector('[role="alert"]');
		errorElem?.remove()
	};
}

export default ValidationForm;

export const validateInput = (firstElement: HTMLInputElement, secondElement?: HTMLInputElement): boolean => {
	const validation = new ValidationForm;
	if (firstElement.name === 'login') {
		if (!validation.checkLogin(firstElement.value)) {
			validation.showError(firstElement, '.form-group');
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'password') {
		if (!validation.checkPassword(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'oldPassword') {
		if (!validation.checkPassword(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'returnNewPass' && secondElement) {
		if (!validation.checkPassword(firstElement.value) || !validation.checkPasswordConfirm(firstElement.value, secondElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо пароли не совпадают");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'returnNewPass') {
		if (!validation.checkPassword(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'newPassword') {
		if (!validation.checkPassword(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо менее 8 символов");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'email') {
		if (!validation.checkEmail(firstElement.value)) {
			validation.showError(firstElement, '.form-group');
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'phone') {
		if (!validation.checkPhone(firstElement.value)) {
			validation.showError(firstElement, '.form-group');
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'first_name') {
		if (!validation.checkName(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо имя с маленькой буквы");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'second_name') {
		if (!validation.checkName(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат, либо фамилия с маленькой буквы");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'display_name') {
		if (!validation.checkName(firstElement.value)) {
			validation.showError(firstElement, '.form-group', "Неверный формат");
			return false;
		} else {
			validation.hideError(firstElement, '.form-group');
			return true;
		}
	} else if (firstElement.name === 'message') {
		if (!validation.checkEmptyValue(firstElement.value)) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

export const inputValueHandler = (element: HTMLInputElement) => {
	if (element) {
		element.setAttribute('value', element.value);
		validateInput(element as HTMLInputElement);
	}
};
