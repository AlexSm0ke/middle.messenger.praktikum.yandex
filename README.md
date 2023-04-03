Макет figma https://www.figma.com/file/WHxzTCYSbWJgR68t1Moxy6/Untitled?node-id=0%3A1&t=QaJmysXh8EK4Pumx-1

Деплой проекта https://astounding-sunshine-413466.netlify.app

Перед запуском проекта сделайте npm install

Запустить проект можно с помощью команды npm run start.

Валидация форм работает. 

{
	"extends": "stylelint-config-standard",
	"rules": {
		"selector-class-pattern": null,
		"no-duplicate-selectors": null,
		"no-descending-specificity": null
	},
	"ignoreFiles": [
		"dist/*"
	],
	"customSyntax": "postcss",
	"plugins": [
		"stylelint-scss"
	]
}
