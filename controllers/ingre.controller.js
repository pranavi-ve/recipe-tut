const ingreServ = require("../services/ingre.service");
function getIngredients(query) {
  try {
    return ingreServ
      .findIngredients(query)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    throw error;
  }
}
function addIngredients(details) {
  try {
    return ingreServ
      .insertIngredient(details)
      .then((data) => ({ message: "Ingredients added successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (error) {}
}
module.exports = { getIngredients, addIngredients };