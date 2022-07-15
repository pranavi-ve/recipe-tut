const db = require("../db");
function insertUser(usr) {
  const dbo = db.getDb();
  return new Promise((res, rej) => {
    dbo.collection("users").insertOne(usr, (err, result) => {
      if (err) rej(err);
      if (!result) rej("Unknown error occured");
      res(result);
    });
  });
}

function findUser(input){
  const dbo = db.getDb();
  return new Promise((res, rej) => {
    dbo.collection("users").findOne(input, (err, result)=>{
      if(err)rej(err);
      if (!result) rej("No user found");
      res(result);
    })
  })
}
module.exports = { insertUser, findUser };
