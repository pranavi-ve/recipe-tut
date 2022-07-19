const express = require("express");
const joi = require("joi");
const { validateInput } = require("../helpers/validations");
const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", (req, res, next) => {
  try {
    const input = req.body;
    const schema = joi
      .object({
        username: joi.string().min(3).required(),
        password: joi.string().min(8).required(),
        lastLoginTime: joi.date().default(Date.now()),
      })
      .required();
    const data = validateInput(schema, input);
    if (data.hasError) {
      res.status(422).json({ message: data.errors });
      return;
    }
    loginUser(data.value)
      .then((token) =>{
        console.log("inside route",data);
        const headers = {
          "Authorization":"Bearer "+token
        }
        res.set(headers);
        res.json({message:"User Authenticated Successfully!"});
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
      }).required();
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

//expire token
router.get("/logout", (req, res) => {
  const headers = req.headers;
  //jwt
    if(!headers || !headers.authorization) throw new Error('Cannot find auth token');
    return logoutUser(headers.authorization)
      .then((data)=>res.json(data))
      .catch((e)=>next(e))
});

module.exports = router;
