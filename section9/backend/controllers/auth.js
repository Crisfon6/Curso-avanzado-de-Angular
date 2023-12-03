const { verifyGoogleToken } = require('../helpers/google-verify');
const { generateJwt } = require('../helpers/jwt');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        //validate email
        const userDb = await User.findOne({ email });
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Wrong credentials 1'
            });
        }
        //validate password
        const validPassword = bcryptjs.compareSync(password, userDb.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong credentials 2'
            })
        }
        //generate jwt
        const token = await generateJwt(userDb.id);

        res.json({ ok: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error.' })
    }
};

const loginGoogle = async(req, res) => {
    try {
        const { email, name, picture } = await verifyGoogleToken(req.body.token);

        const userDB = await User.findOne({ email });

        let user;
        if (!userDB) {
            user = new User({
                name,
                email,
                img: picture,
                password: '@@@',
                google: true
            });

        } else {
            user = userDB;
            user.google = true;
        }
        //save user
        await user.save();

        //generate jwt
        const token = await generateJwt(user.id);

       return res.json({ ok: true, msg: 'Login success', email, name, picture, token });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Unexpected error." });
    }
};
const renewToken = async(req, res) => {
    console.log("renew token",req.uid);
    const token = await generateJwt(req.uid);
    const user = await User.findById(req.uid);
    res.json({
        ok: true,
        token,
        user
    });
};

module.exports = {
    login,
    loginGoogle,
    renewToken
};