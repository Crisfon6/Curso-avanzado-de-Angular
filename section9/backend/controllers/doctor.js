const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const getDoctors = async(req, res) => {
    const doctors = await Doctor.find().populate('hospital', 'name').populate('user', 'name');
    res.json({
        ok: true,
        doctors
    });
};
createDoctor = async(req, res) => {
    const { hospital } = req.body;
    try {

        const hospitalDb = await Hospital.findById(hospital);
        if (!hospitalDb) {
            res.status(404).json({
                ok: false,
                msg: 'Hospital not found.'
            });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error.'
        });
    }

    const doctor = Doctor({...req.body, user: req.uid });
    try {
        await doctor.save();
        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error.'
        });
    }
};
updateDoctor = (req, res) => {

    res.json({
        ok: true,
        msg: 'getDoctor'
    })
};

deleteDoctor = (req, res) => {
    res.json({
        ok: true,
        msg: 'getDoctor'
    })
};


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,

};