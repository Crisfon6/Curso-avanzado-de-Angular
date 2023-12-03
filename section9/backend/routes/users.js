const { Router } = require("express");
const { getUsers, createUser, updateUser, deleteUser, updatePassword } = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.get("", validateJWT, getUsers);
router.post(
    "", [
        validateJWT,
        check("name", "name is mandatory").not().isEmpty(),
        check("password", "password is mandatory").not().isEmpty(),
        check("email", "email is mandatory").isEmail(),
        validateFields,
    ],
    createUser
);
router.put(
    "/:id", [validateJWT,
        check("name", "name is mandatory").not().isEmpty(),
        check("email", "email is mandatory").isEmail(),
        validateFields
    ],
    updateUser
);
router.put(
    "/password/:id", [validateJWT,
        check("password", "name is mandatory").not().isEmpty(),
        validateFields
    ],
    updatePassword
);
router.delete('/:id', [validateJWT], deleteUser);
module.exports = router;