const db = require("../db");

async function findRecipes(query = {}) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      dbo
        .collection("recipes")
        .find(query)
        .toArray()
        .then((result, err) => {
          if (err) rej(err);
          if (!result) rej("No recipes found");
          res(result);
        });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { findRecipes };
