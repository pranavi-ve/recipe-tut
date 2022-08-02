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
  recipe: joi.object({
    name: joi.string().min(3).required(),
    ingredients: joi.array().items(
      joi.object({
        name: joi.string().required(),
        quantity: joi.string().required(),
      })
    ),
    time: joi.string().required(), 
    instructions: joi.string().required(),
    tips: joi.string(),
    category: joi.string().required(),
    img: joi.string().uri(),
    video: joi.string().uri(),
    uploadedAt: joi.date().default(Date.now()),
    author: joi.object({
      name: joi.string().required(),
      bio: joi.string(),
      img: joi.string().uri(),
    }),
  }),
};

module.exports = schema;
