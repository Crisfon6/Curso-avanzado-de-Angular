const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');
const fs = require('fs');

const deleteImage = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

const updateImage = async(type, id, fileName) => {
    const success = false;
    try {
        switch (type) {
            case 'users':
                const user = await User.findById(id);
                if (!user) {
                    return false;
                }
                const oldPath = `./uploads/users/${user.img}`;

                deleteImage(oldPath);

                user.img = fileName;
                await user.save();
                return true;
                break;
            case 'hospitals':
                const hospital = await Hospital.findById(id);
                if (!hospital) {
                    return false;
                }
                const oldPathHospital = `./uploads/hospitals/${hospital.img}`;
                deleteImage(oldPathHospital);

                hospital.img = fileName;
                await hospital.save();
                return true;
                break;
            case 'doctors':
                const doctor = await Doctor.findById(id);
                if (!doctor) {
                    return false;
                }
                const oldPathdoctor = `./uploads/doctors/${doctor.img}`;
                deleteImage(oldPathdoctor);
                doctor.img = fileName;
                await doctor.save();
                return true;
                break;

            default:
                return false;
                break;
        }
    } catch (error) {
        console.log('error updating image : ', error);
        return false;
    }
};


module.exports = {
    updateImage,
    deleteImage
}