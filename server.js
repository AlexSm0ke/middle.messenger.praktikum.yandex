/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static([__dirname, 'dist'].join('/')));

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});

app.get('*', (_, res) => {
	res.sendFile("index.html", { root: __dirname + "/dist" })
})
