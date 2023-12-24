const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("x-token");
  
  if (!token) {
    return res.status(401).json({ ok: false, msg: "Token is required." });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    console.log("Error: token invalido");
    return res.status(401).json({
      ok: false,
      msg: "Invalid Token",
    });
  }
};

module.exports = {
  validateJWT,
};
