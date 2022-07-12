const express = require("express");
const { validateRegisterInput } = require("../helpers/validations");
const { registerUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {
  try {
    //path params
    //query params
    //payload or body
    const input = req.body;
    // const data = validateRegisterInput(input);
    // if (data.hasError) {
    //   res.status(422).json({ message: data.errors });
    //   return;
    // }
    validateRegisterInput(input)
      .then((data) => {
        if (data.hasError) {
          res.status(422).json({ message: data.errors });
          return;
        }
        return data.value;
      })
      .then((usrInput) => {
        return registerUser(usrInput);
      })
      .then((data) => {
        res.json(data);
      })
      .catch((e) => console.log(e));

    // res.json(data.value);
  } catch (error) {
    res.json({ error });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
