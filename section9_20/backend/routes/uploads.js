const { Router } = require('express');
const { validateJWT, } = require('../middlewares/validate-jwt');
const { uploadFile, getImg, } = require('../controllers/upload');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());


router.put("/:type/:id", validateJWT, uploadFile);
router.get("/:type/:img",  getImg);
module.exports = router;