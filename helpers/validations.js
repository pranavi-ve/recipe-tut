const joi = require("joi");

function validateRegisterInput(input) {
  try {
    const schema = joi.object({
      username: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
      cfpassword: joi.ref("password"),
      email: joi.string().email().required(),
      gender: joi.string(),
      age: joi.number(),
      role: joi.string().default("USER"),
      lastLoginTime: joi.string(),
      lastLogoutTime: joi.string(),
    }).required();
    const data=schema.validate(input);
    if(data.error){
       const errors = data.error.details.map((item)=>item.message);
        return {hasError: true, errors};
    }
    return data;
  } catch (error) {
      throw error;
  }
}

module.exports = { validateRegisterInput };
