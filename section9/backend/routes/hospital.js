const { Router } = require('express');
const { getHospitals, updateHospital, createHospital, deleteHospital } = require('../controllers/hospital');
const { validateJWT, } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.get("", validateJWT, getHospitals);
router.post(
    "", [
        validateJWT,
        check("name", "The name is mandatory").not().isEmpty(),
        validateFields
    ],
    createHospital
);
router.put(
    "/:id", [
        validateJWT,

        // validateFields
    ],
    updateHospital
);
router.delete('/:id', [], deleteHospital);
module.exports = router;