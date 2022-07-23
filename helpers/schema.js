const joi = require("joi");

const schema = {
  login: joi
    .object({
      username: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
      lastLoginTime: joi.date().default(Date.now()),
    })
    .required(),
  register: joi
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
    .required(),
};

module.exports = schema;
