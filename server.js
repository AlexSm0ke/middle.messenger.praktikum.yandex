// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static([__dirname, 'dist'].join('/')));

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
}); 
