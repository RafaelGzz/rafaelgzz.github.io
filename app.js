const express = require('express');
const path = require('path');
require('dotenv').config();

// Routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const messagesRouter = require('./routes/messages');
const groupsRouter = require('./routes/groups');
const conversationsRouter = require('./routes/conversations');
const awsRouter = require('./config-aws');

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
const publicPath = path.resolve(__dirname);
app.use(express.static(publicPath));


// Uses
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/aws', awsRouter);

// Launch
server.listen(process.env.PORT, (err) => {
    if (err) throw Error(err);
    console.log('Servidor corriendo en puerto ', process.env.PORT);
});