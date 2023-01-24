const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin)) {
    res.header("Acess-Control-Allow.Credentails", true);
  }
  next();
};

module.exports = credentials;
