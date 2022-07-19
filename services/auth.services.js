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
};

function findAndUpdateUser(query, upObj){
  const dbo = db.getDb();
  return new Promise((res, rej) => {
    dbo.collection("users").findOneAndUpdate(query, upObj, (err, result)=>{
      if(err)rej(err);
      if (!result) rej("No user found");
      res(result);
    })
  })
}

function updateUser(query, upObj){
  const dbo = db.getDb();
  return new Promise((res, rej) => {
    dbo.collection("users").updateOne(query, upObj, (err, result)=>{
      if(err)rej(err);
      if (!result) rej("No user found");
      res(result);
    })
  })
}
module.exports = { insertUser, findUser, findAndUpdateUser, updateUser };
