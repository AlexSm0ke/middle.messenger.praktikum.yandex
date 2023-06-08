/* eslint-disable */
const path = require("path");
const fs = require("fs");
const jsonServer = require('json-server')

const server = jsonServer.create();
const routes = {
	messages: {},
};

const dbJsonFilePath = path.join(__dirname, 'db.json');
console.log(dbJsonFilePath);
fs.writeFileSync(dbJsonFilePath, JSON.stringify(routes), {});
const router = jsonServer.router(dbJsonFilePath);
const middlewares = jsonServer.defaults({
	noCors: false,
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get('/api/test', (req: any, res: any) => {
	res.status(200).json({ status: "OK" });
});

// Use default router
server.use(router);

export default server;
