const { deleteImage } = require("../helpers/update-image");
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const User = require('../models/user');

const getDoctors = async(req, res) => {
    const doctors = await Doctor.find().populate('hospital', 'name').populate('user', 'name');
    return res.json({
        ok: true,
        doctors
    });
};
const getDoctor = async(req,res)=>{
    const {id} = req.params;
    const doctor = await Doctor.findById(id).populate('hospital', 'name').populate('user', 'name');
    return  res.json({
        ok:true,
        doctor
    })
}
createDoctor = async(req, res) => {
    const { hospital,name } = req.body;
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
    const doctor = Doctor({ name,hospital
        , user: req.uid });
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

updateDoctor = async(req, res) => {
    try {
        const { id } = req.params;
        const { user, name, hospital } = req.body;
        const doctorDB = await Doctor.findById(id);
        //validate doctor
        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor no found'
            });
        }
        //validate user
        if (user && doctorDB.user !== user) {
            const userDB = await User.findById(user);
            if (!userDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'User no found'
                });
            }
        }
        //validate hospital
        if (hospital && doctorDB.hospital !== hospital) {
            const hospitalDB = await Hospital.findById(hospital);
            if (!hospitalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Hospital no found'
                });
            }
        }


        const doctorUpdated = await Doctor.findByIdAndUpdate(id, { user, name, hospital }, { new: true });
        res.json({
            ok: true,
            msg: 'Doctor updated.',
            doctorUpdated
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Unexpected error' });
    }
};

deleteDoctor = async(req, res) => {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ ok: false, msg: 'Doctor no found' });
        }
        if (doctor.img) {
            await deleteImage(doctor.img);
        }
        await Doctor.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Doctor deleted'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Unexpected error'
        });
    }
};


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctor
};