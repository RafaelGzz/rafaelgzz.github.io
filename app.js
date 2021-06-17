const express = require('express');
const path = require('path');
require('dotenv').config();

// Routers
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

// DB Connection
const { dbConnection } = require('./database/config');
dbConnection();

// Express App
const app = express();
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

// Public Path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Uses
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Launch
server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err);
    console.log('Servidor corriendo en puerto ', process.env.PORT);
});