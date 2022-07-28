const { ObjectID } = require("bson");
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
      .insertIngredient({name:details.name})
      .then((data) => ({ message: "Ingredients added successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (error) { 
    throw error;
  }
}
function deleteIngredientsById(id) {
  try {
    console.log(ObjectID(id));
    return ingreServ
      .deleteIngredient({_id : ObjectID(id)})
      .then((data) => ({ message: "Ingredient deleted successfully" }))
      .catch((e) => {
        throw e;
      });
  } catch (error) { 
    throw error;
  }
}
function autoSearch(input) {
  try {
    return ingreServ
      .autoComplete(input.query)
      .then((data) => res.json(data))
      .catch((e) => {
        throw e;
      });
  } catch (error) { 
    throw error;
  }
}
module.exports = { getIngredients, addIngredients, deleteIngredientsById, autoSearch };