const express = require("express");
const schema = require("../helpers/schema");
const { authenticate } = require("../middlewares/auth.middleware");
const { validateInput } = require("../middlewares/validation.middleware");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");

const router = express.Router();

//routes--------------------------->
router.post("/login", validateInput(schema.login), handleLogin);
router.post("/register", validateInput(schema.register), handleRegister);
router.get("/logout", authenticate, handleLogout);

//middlewares----------------------->
function handleLogin(value, req, res, next) {
  try {
    loginUser(value)
      .then((token) => {
        const headers = {
          Authorization: "Bearer " + token,
        };
        res.set(headers);
        res.json({ message: "User Authenticated Successfully!" });
        return;
      })
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    next(error);
  }
}
function handleRegister(value, req, res, next) {
  try {
    registerUser(value)
      .then((data) => res.json(data))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  } catch (error) {
    next(error);
  }
}
function handleLogout(req, res, next) {
  const headers = req.headers;
  //jwt
  if (!headers || !headers.authorization)
    throw new Error("Cannot find auth token");
  return logoutUser(headers.authorization)
    .then((data) => res.json(data))
    .catch((e) => next(e));
}
module.exports = router;
