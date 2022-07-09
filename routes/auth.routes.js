const express = require("express");
const { validateRegisterInput } = require("../helpers/validations");

const router = express.Router();

router.post("/login", (req, res) => {});

router.post("/register", (req, res) => {
  try {
    //path params
    //query params
    //payload or body
    const input = req.body;
    const data = validateRegisterInput(input);
    if (data.hasError) {
      res.status(422).json({ message: data.errors });
      return;
    }
    res.json(data);
  } catch (error) {
    res.json({ error });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
