const bcrypt = require("bcryptjs");
const {insertUser} = require("../services/auth.services");

async function registerUser(user) {
  const hash = bcrypt.hashSync(user.password);
  const newUser = { ...user, password: hash };

  return insertUser(newUser)
    .then(() =>({ message: "User registered successfully" }))
    .catch((err) => {
        console.log(err);
        throw err;
    });
}

module.exports = { registerUser };
