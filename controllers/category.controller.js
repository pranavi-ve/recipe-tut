const catServ = require("../services/category.service");
function getCategories(query) {
  try {
    return catServ
      .findCategories(query)
      .then((data) => data)
      .catch((e) => {
        throw e;
      });
  } catch (error) {
      throw error;
  }
}

module.exports = {getCategories}