const jwt = require("jsonwebtoken");
const authServ = require("../services/auth.services");
function authenticate(req, res, next) {
  try {
    const headers = req.headers;
    if (!headers || !headers.authorization)
      throw Error("Authentication Failed");
    const token = headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    authServ
      .findUser({ username: decoded.username, role: decoded.role })
      .then((data) => {
        req.user = { _id: data._id, username: data.username };
        next();
      })
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticate };
