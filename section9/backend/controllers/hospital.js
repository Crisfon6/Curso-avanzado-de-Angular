const Hospital = require('../models/hospital');
const User = require('../models/user');

const getHospitals = async(req, res) => {
    const hospitals = await Hospital.find().populate('user', 'name');
    res.json({
        ok: true,
        hospitals
    })
};
createHospital = async(req, res) => {
    try {
        const hospital = Hospital({
            ...req.body,
            user: req.uid
        });
        await hospital.save();
        res.json({
            ok: true,
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error.'
        });
    }
};

updateHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospital'
    })
};

deleteHospital = (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospital'
    })
};


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,

};