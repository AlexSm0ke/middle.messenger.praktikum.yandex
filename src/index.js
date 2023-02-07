import login from './pages/login/login.hbs';
import singup from './pages/singup/singup.hbs';
import './components/input'
import './components/inputField'
import './components/button'

function render(html) {
	const app = document.querySelector('#app');
	console.log('app', app);

	app.innerHTML = html;
};

const ROUTES = {
	'login': login,
	'singup': singup,
};

window.goToPage = function (namePage) {
	const page = ROUTES[namePage];
	render(page());
}

window.addEventListener('DOMContentLoaded', () => {
	render(ROUTES.login());
})
