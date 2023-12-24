const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h',

        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Cant generate JWT');
            } else {
                resolve(token);
            }
        })
    });
};

module.exports = {
    generateJwt
}