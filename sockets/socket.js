const { io } = require('../app.js');
const { validateJWT } = require('../helpers/jwt.js');
const { userDisconnected, userConnected, saveMessage, saveGroupMessage } = require('../controllers/socket_controller');
const Group = require('../models/group.js');

io.on('connection', (client) => {

    console.log('Cliente conectado');
    token = client.handshake.headers['authorization'];
    const [success, uid] = validateJWT(token);
    if (!success) {
        return client.disconnect();
    }

    // console.log('Cliente autenticado');
    userConnected(uid);

    // Ingresar usuario a sala especifica
    client.join(uid);
    console.log(uid);
    console.log("Conectado");

    client.on('mensaje-grupal', async(payload) => {

        console.log(payload);

        await saveGroupMessage(payload);

        const group = await Group.findById(payload.groupId);
        group.users.forEach(user => {
            if (payload.sender != uid) {
                io.to(user).emit('mensaje-grupal', payload);
            }
        });

    });

    // escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async(payload) => {

        await saveMessage(payload);
        io.to(payload.receiver).emit('mensaje-personal', payload);

    });


    client.on('disconnect', () => {
        userDisconnected(uid);
    });

});