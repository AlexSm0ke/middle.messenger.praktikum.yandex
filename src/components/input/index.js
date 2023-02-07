import input from './input.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('input', input);

const input_input = document.querySelector('.input-container__input');

const placeholder = document.querySelector('.input-container__placeholder');
console.log('input_input', input_input);
console.log('input_input', placeholder);

// input_input.addEventListener('focus', () => {
// 	placeholder.className = 'input-container__placeholder_modified';
// })


