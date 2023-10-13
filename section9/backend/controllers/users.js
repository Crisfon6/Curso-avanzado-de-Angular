const User = require('../models/user');
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../helpers/jwt');

const getUsers = async(req, res) => {
    const users = await User.find();

    res.json({
        ok: true,
        users,
        message: 'getUsers',
        uid: req.uid
    });
};
const createUser = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const emailRegistered = await User.findOne({ email });
        if (emailRegistered) {
            return res.status(400).json({ ok: 'false', msg: 'Email already taked' });
        }
        const user = new User(req.body);
        //encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        const userSaved = await user.save();
        const token = await generateJwt(userSaved._id);
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error...review logs'
        });
    }

}
const updateUser = async(req, res = response) => {
    const uid = req.params.id;

    try {
        //TODO : validate jwt
        const user = await User.findById(uid);
        if (!user) {
            res.status(404).json({ ok: false, msg: 'User no found' });
        }

        // update
        const { password, google, email, ...fields } = req.body;

        if (user.email !== email) {
            const userEmail = await User.find({ email });
            if (userEmail.length > 0) {
                return res.status(400).json({ ok: 'false', msg: 'Email already taked' });
            }
        }
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });
        res.json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error.' })
    }
}
const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ ok: false, msg: 'User no found' });
        }
        await User.findByIdAndDelete(id);
        res.json({ ok: true, msg: 'User deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error.' })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}