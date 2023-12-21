const { Router } = require("express");
const { getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctor } = require("../controllers/doctor");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.get("", validateJWT, getDoctors);
router.get("/:id", validateJWT, getDoctor);
router.post(
  "",
  [
    validateJWT,
    check("name", "The name is required").notEmpty(),
    check("hospital", "The hospital invalid").isMongoId(),
    validateFields,
  ],
  createDoctor
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "The name is required").notEmpty(),
    validateFields,
  ],
  updateDoctor
);
router.delete("/:id", [validateJWT], deleteDoctor);
module.exports = router;
