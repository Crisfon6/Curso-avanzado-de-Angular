const { Router } = require('express');
const { validateJWT, } = require('../middlewares/validate-jwt');
const { getAll, getAllByCollection } = require('../controllers/todo');
const router = Router();

router.get("/:term", validateJWT, getAll);
router.get("/:collection/:term", validateJWT, getAllByCollection);

module.exports = router;