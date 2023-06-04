import { assert } from 'chai';
import { Router } from './';
import Block from '../../utils/Block';

export class TestComponent extends Block {
	_render() { }
	getContent() {
		return document.createElement('div');
	}
}

describe('Router', () => {
	it('should be only one instance', () => {
		const Router1 = new Router('root1');
		const Router2 = new Router('root2');
		assert.equal(Router1, Router2);
	});

	it('should add routes', () => {
		const router = new Router('root1');
		router.use('/', TestComponent);
		router.use('/index', TestComponent);
		router.go('/');
		assert.equal(window.location.pathname, '/');
		router.go('/index');
		assert.equal(window.location.pathname, '/index');
	});
});
