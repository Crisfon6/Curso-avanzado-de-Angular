const { Router } = require('express');
const { getDoctors } = require('../controllers/doctor');
const { validateJWT, } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get("",
    // validateJWT,
    getDoctors);
router.post(
    "", [
        validateJWT,
        check('name', 'The name is required').notEmpty(),
        check('hospital', 'The hospital invalid').isMongoId(),
        validateFields
    ],
    createDoctor
);
router.put(
    "/:id", [
        // validateJWT,

        // validateFields
    ],
    updateDoctor
);
router.delete('/:id', [], deleteDoctor);
module.exports = router;