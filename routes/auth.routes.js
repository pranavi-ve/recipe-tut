const express = require("express");
const joi = require("joi");

const { validateInput } = require("../helpers/validations");
const {
  registerUser,
  authenticateUser,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", (req, res, next) => {
  try {
    const input = req.body;
    const schema = joi
      .object({
        username: joi.string().min(3).required(),
        password: joi.string().min(8).required(),
      })
      .required();
    const data = validateInput(schema, input);
    if (data.hasError) {
      res.status(422).json({ message: data.errors });
      return;
    }
    authenticateUser(data.value)
      .then((data) =>{
        console.log("inside route",data);
         res.json(data);
         return;
      })
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    next(error);
  }
});

router.post("/register", (req, res, next) => {
  try {
    const input = req.body;
    const schema = joi
      .object({
        username: joi.string().min(3).required(),
        password: joi.string().min(8).required(),
        cfpassword: joi.ref("password"),
        email: joi.string().email().required(),
        gender: joi.string(),
        age: joi.number(),
        role: joi.string().default("USER"),
        lastLoginTime: joi.string(),
        lastLogoutTime: joi.string(),
        createdTime: joi.date().default(Date.now()),
      })
      .required();
    const data = validateInput(schema, input);
    if (data.hasError) {
      res.status(422).json({ message: data.errors });
      return;
    }
    registerUser(data.value)
      .then((data) => res.json(data))
      .catch((e) => {
        console.log(e);
        throw e;
      });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
