const express = require("express");
const { validateRegisterInput } = require("../helpers/validations");
const { registerUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {
  try {
    const input = req.body;

    const data = validateRegisterInput(input);
    if (data.hasError) {
      res.status(422).json({ message: data.errors });
      return;
    };

    registerUser(data.value)
      .then((data) => res.json(data))
      .catch((e) => console.log(e));

  } catch (error) {
    res.json({ error });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
