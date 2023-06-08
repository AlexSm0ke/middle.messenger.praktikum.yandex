import { expect } from 'chai';
import { HTTPTransport } from './httpTransport';
import app from '../../../test/server';
import { API_TEST_PATH } from '../../utils/constants';


let server: any;

describe('HTTP module ', () => {

	before(() => {
		server = app.listen(3000, () => {
			console.log('JSON Server is running on port 3000');
		});
	});

	after(() => {
		server.close();
	});

	it('GET request', async function () {
		const http = new HTTPTransport();
		const response = await http.get(`${API_TEST_PATH}/api/test`);
		const result = response.response;
		const status = result.status;
		expect(status).equal("OK")
	});

	it('POST request', async () => {
		const text = 'test message';
		const http = new HTTPTransport();
		const response = await http.post(`${API_TEST_PATH}/messages`, {
			data: JSON.stringify({ text }),
			headers: { 'Content-Type': 'application/json; charset=utf-8' }
		});
		const result = response.response;
		expect(result).to.have.property('text').and.equal(text);
	});

});
