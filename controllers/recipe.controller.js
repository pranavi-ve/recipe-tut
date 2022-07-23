const recipeServ = require("../services/recipe.service");
function getRecipes(query) {
  try {
    return recipeServ
      .findRecipes(query)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });
  } catch (error) {
      throw error;
  }
}

module.exports = {getRecipes}