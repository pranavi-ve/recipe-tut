const express = require("express");
const {
  getIngredients,
  addIngredients,
} = require("../controllers/ingre.controller");
const { authorize, authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  //ingredients ane db
  getIngredients()
    .then((data) => res.json(data))
    .catch((e) => next(e));
});

router.post("/", authenticate, authorize("ADMIN"), (req, res, next) => {
  addIngredients(req.body)
    .then((data) => res.json(data))
    .catch((e) => next(e));
});

module.exports = router;
