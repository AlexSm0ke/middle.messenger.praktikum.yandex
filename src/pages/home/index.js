import home from './home.hbs'

function render(html) {
	const app = document.querySelector('#app');
	app.textContent = html;
};

window.addEventListener('DOMContentLoaded', () => {
	const html = home({ name: 'Jon Doe' });
	render(html);
})
