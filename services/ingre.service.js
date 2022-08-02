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

async function insertIngredient(details) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      dbo.collection("ingredients").insertOne(details, (err, result) => {
        if (err) rej(err);
        if (!result) rej("Unknown error occured");
        res(result);
      });
    });
  } catch (error) {
    throw error;
  }
}

async function deleteIngredient(details) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      dbo.collection("ingredients").deleteOne(details, (err, result) => {
        if (err) rej(err);
        if (!result) rej("Unknown error occured");
        res(result);
      });
    });
  } catch (error) {
    throw error;
  }
}
async function autoComplete(q) {
  try {
    const dbo = db.getDb();
    return new Promise((res, rej) => {
      const agg = [
          {
              "$search": {
                  "autocomplete": {
                      "query": q,
                      "path": "name",
                      "fuzzy": {
                          "maxEdits": 2,
                          "prefixLength": 3
                      }
                  }
              }
          }
      ];
      dbo
        .collection("ingredients")
        .aggregate(agg)
        .toArray()
        .then((result, err) => {
          console.log("result", result);
          console.log("err",err);
          if (err) rej(err);
          if (!result) rej("Unknown error occured");
          res(result);
        });
    });
  } catch (error) {
    throw error;
  }
}
module.exports = {
  findIngredients,
  insertIngredient,
  deleteIngredient,
  autoComplete,
};
