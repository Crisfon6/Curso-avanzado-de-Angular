const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        const uriDB = process.env.URI_DB;
        await  mongoose.connect(uriDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
};

module.exports = {
    dbConnection
}