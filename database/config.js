const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
    } catch (error) { 
console.log(error);
        console.log('error :>> ', error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}