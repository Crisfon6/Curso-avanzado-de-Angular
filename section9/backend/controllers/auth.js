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
}

module.exports = {
    login
}