const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const newUser = async(req, res) => {

    try {
        const user = new User(req.body);

        const emailExists = await User.findOne({ email: user.email });
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: {
                    "email":
                    {
                        "msg" :"El correo ya está registrado",
                        "param": "email",
                        "location": "body"
                    }
                }
            })
        }

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        await user.save();

        // Generar JWT
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const login = async(req, res) => {


    try {
        const { email, password } = req.body;

        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        // GENERAR JWT
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hable con el admin'
        });

    }
}

const renewToken = async(req, res) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    const userDB = await User.findById(uid)

    res.json({
        ok: true,
        user: userDB,
        token
    });
}

module.exports = {
    newUser,
    login,
    renewToken
}