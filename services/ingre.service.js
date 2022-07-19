const db = require("../db");

async function findIngredients(query = {}) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      dbo
        .collection("ingredients")
        .find(query)
        .toArray()
        .then((result, err) => {
          if (err) rej(err);
          if (!result) rej("No ingredients found");
          res(result);
        });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { findIngredients };
