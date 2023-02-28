Макет figma https://www.figma.com/file/WHxzTCYSbWJgR68t1Moxy6/Untitled?node-id=0%3A1&t=QaJmysXh8EK4Pumx-1

Деплой проекта https://astounding-sunshine-413466.netlify.app

Перед запуском проекта сделайте npm install

Запустить проект можно с помощью команды npm run start.

Для переключения страниц в файле src -> index.js в слушателе событий DOMContentLoaded необходимо указать в рендере страницу отрисовки и пропсы для нее

const ROUTES = {
	'login': login,
	'singup': singup,
	'page404': page404,
	'page500': page500,
	'profile': profile,
	'profileEdit': profileEdit,
	'profilePassword': profilePassword,
	'main': main,
};

render(ROUTES.profilePassword(PROPS.profilePassword));
