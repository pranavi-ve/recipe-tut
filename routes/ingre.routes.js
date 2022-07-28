const express = require("express");
const {
  getIngredients,
  addIngredients,
  deleteIngredientsById,
  autoSearch
} = require("../controllers/ingre.controller");
const { authorize, authenticate } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/search", authenticate, authorize("ADMIN"), (req, res, next) => {
  try {
    const query = req.body;
    autoSearch(query)
      .then((data) => res.json(data))
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
});

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

router.delete("/:id", authenticate, authorize("ADMIN"), (req, res, next) => {
  try {
    const id = req.params;
    console.log(id);
    if (!id) throw Error("Id is required");
    deleteIngredientsById(req.params.id)
      .then((data) => res.json(data))
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
});


module.exports = router;
