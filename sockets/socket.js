const { io } = require('../app.js');
const { validateJWT } = require('../helpers/jwt.js');
const { userDisconnected, userConnected } = require('../controllers/socket_controller');

io.on('connection', (client) => {

    console.log('Cliente conectado');
    token = client.handshake.headers['authorization'];
    const [success, uid] = validateJWT(token);
    if (!success) {
        return client.disconnect();
    }

    // console.log('Cliente autenticado');
    userConnected(uid);


    client.on('disconnect', () => {
        userDisconnected(uid);
    });

    client.on('mensaje', (mensaje) => {
        console.log(mensaje);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    // client.on('emitir-mensaje', (payload) =>{
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
});