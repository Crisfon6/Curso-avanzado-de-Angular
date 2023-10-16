const User = require("../models/user");
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async(req, res) => {
    const { term } = req.params;
    const regex = new RegExp(term, 'i');
    try {
        const [user, hospital, doctor] = await Promise.all([
            User.find({ name: regex }),
            Hospital.find({ name: regex }),
            Doctor.find({ name: regex })
        ]);
        res.json({ ok: true, user, hospital, doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error' });
    }
}
const getAllByCollection = async(req, res) => {
    const { term, collection } = req.params;
    const regex = new RegExp(term, 'i');
    let data = [];
    try {
        switch (collection) {
            case 'users':
                data = await User.find({ name: regex });
                break;
            case 'hospital':
                data = await Hospital.find({ name: regex });
                break;
            case 'doctor':
                data = await Doctor.find({ name: regex });
                break;
            default:
                return res.status(404).json({ ok: false, msg: 'Collection no found' });
                break;
        }
        res.json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error' });
    }
}
module.exports = {
    getAll,
    getAllByCollection
}