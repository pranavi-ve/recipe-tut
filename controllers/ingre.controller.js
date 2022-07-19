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

module.exports = {getIngredients}