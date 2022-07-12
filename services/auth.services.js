const db = require("../db");
async function insertUser(usr) {
  const dbo = db.getDb();
 return await  dbo.collection("users").insertOne(usr, (err, result) => {
    if (err) throw err;
    return { message: "User created successfully!" };
  });
}

module.exports = { insertUser };
