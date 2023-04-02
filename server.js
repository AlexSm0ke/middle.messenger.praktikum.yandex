// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static([__dirname, 'dist'].join('/')));

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});

app.get('*', (_, res) => {
	res.sendfile(path.join(__dirname, 'dist/index.html'));
})
