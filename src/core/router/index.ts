import Block from "../../utils/Block";
import { ROUTES } from "../../utils/constants";
import Route from "./route";

class Router {
	private static __instance: Router;
	private routes: Route[] = [];
	private history = window.history;
	private _currentRoute: Route | null = null;
	private _rootQuery: string = '#app';

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}
		Router.__instance = this;

		this._rootQuery = rootQuery;
	}

	static getInstanse() {
		return Router.__instance;
	}

	getCurrentRoute() {
		return this._currentRoute;
	}

	// регистрирует блок по пути в роут и возвращает себя, чтобы можно было выстроить в цепочку
	use(pathname: string, block: any) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });

		this.routes.push(route);

		return this;
	}

	// по событию onpopstate запускает приложение
	start() {
		// Реагируем на изменения в адресной строке и вызываем перерисовку
		// Событие popstate вызывается, когда изменяется активная запись истории.
		window.onpopstate = ((event: any) => {
			this._onRoute(event.currentTarget.location.pathname);
		}).bind(this);

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		let route = this.getRoute(pathname);

		if (!route) {
			route = this.getRoute(ROUTES.error_404.path);
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route as Route;
		route!.render();
	}

	// переходит на нужный роут и отображает нужный блок;
	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	// возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию
	back() {
		this.history.back();
	}

	// перезагрузка страницы
	reload() {
		window.location.reload();
	}

	//  переходит в следующие состояние и показывает соответствующий блок
	forward() {
		this.history.forward();
	}

	// возвращаем нужный роут
	getRoute(pathname: string) {
		return this.routes.find(route => route.match(pathname));
	}
}

export default Router;
