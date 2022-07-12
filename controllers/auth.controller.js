const bcrypt = require("bcryptjs");
const insertUser = require("../services/auth.services")
async function registerUser(user) {
    const hash = bcrypt.hashSync(user.password);
    const newUser = {...user, password:hash};
    //spread operator
   return insertUser(newUser);
}

module.exports = { registerUser };