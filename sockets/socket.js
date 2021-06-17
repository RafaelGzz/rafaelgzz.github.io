const { io } = require('../app.js');
const { validateJWT } = require('../helpers/jwt.js');


io.on('connection', client => {
    console.log('Cliente conectado');

    token = client.handshake.headers['Authorization'];
    console.log(client.handshake , client.handshake.headers['Authorization']);
    const [success, uid] = validateJWT(token);
    console.log(success, uid);
    if(!success){
        return client.disconnect();
    }
    console.log('Cliente autenticado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (mensaje) => {
        console.log(mensaje);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    // client.on('emitir-mensaje', (payload) =>{
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
});