const bcrypt = require("bcryptjs");
const { insertUser, findUser } = require("../services/auth.services");

async function registerUser(user) {
  const hash = bcrypt.hashSync(user.password);
  const newUser = { ...user, password: hash };

  return insertUser(newUser)
    .then(() => ({ message: "User registered successfully" }))
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

async function authenticateUser(user) {
  //input password hash,
  return findUser({ username: user.username })
    .then((result) => bcrypt.compare(user.password, result.password))
    .then((match) => {
      if (!match) throw { message: "Username or password is incorrect" };
      return { message: "User Authenticated Successfully" };
    })
    .catch((e) => {
      throw { message: "Username or password is incorrect" };
    });
}
module.exports = { registerUser, authenticateUser };
