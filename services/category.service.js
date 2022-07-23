const db = require("../db");

async function findCategories(query = {}) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      dbo
        .collection("categories")
        .find(query)
        .toArray()
        .then((result, err) => {
          if (err) rej(err);
          if (!result) rej("No categories found");
          res(result);
        });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { findCategories };
