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
        req.user = {
          _id: data._id,
          username: data.username,
          role: decoded.role,
        };
        next();
      })
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    next(error);
  }
}

function authorize(roles) {
  return (req, res, next) => {
    let permittedRoles = roles;
    if (typeof roles === "string") {
      permittedRoles = [roles];
    }
    const currentUser = req.user;
    if (permittedRoles.includes(currentUser.role)) {
      next();
      return;
    }
    throw new Error("User not authorized");
  };
}

module.exports = { authenticate, authorize };
