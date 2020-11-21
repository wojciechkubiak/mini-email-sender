require('dotenv').config();
const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.handler);

server.listen(process.env.PORT || 3000);
