const { deleteImage } = require('../helpers/update-image');
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

updateHospital = async(req, res) => {
    try {
        const { id } = req.params;
        const { user, name } = req.body;
        const hospitalDB = await Hospital.findById(id);
        //validate hospital
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no found'
            });
        }
        //validate user
        if (user && hospitalDB.user !== user) {
            const userDB = await User.findById(user);
            if (!userDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User no found'
                });
            }
        }
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, { user, name }, { new: true });
        res.json({
            ok: true,
            msg: 'Hospital updated.',
            hospitalUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error' });
    }
};

deleteHospital = async(req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(404).json({ ok: false, msg: 'Hospital no found' });
        }
        if (hospital.img) {
            await deleteImage(hospital.img);
        }
        await Hospital.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Hospital deleted'
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Unexpected error'
        });
    }
};


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,

};