const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  insertUser,
  findUser,
  findAndUpdateUser,
  updateUser
} = require("../services/auth.services");

//check if username already exists
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

async function loginUser(user) {
  return findUser({ username: user.username })
    .then((result) => {
      const match = bcrypt.compareSync(user.password, result.password);
      if (!match) throw Error("Username or password is incorrect");
      return result;
    }).then((result)=>{
      updateUser(
        {
          username: result.username,
        },
        { $set: { lastLoginTime: Date.now() } }
      );
      return result;
    })
    .then((result) => {
      const token = jwt.sign(
        { username: result.username, role: result.role },
        process.env.JWT_KEY
      );
      return token;
    })
    .catch((e) => {
      throw Error("Username or password is incorrect");
    });
}

async function logoutUser(authToken) {
  const token = authToken.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return findAndUpdateUser(
      {
        username: decoded.username,
      },
      { $set: { lastLogoutTime: Date.now() } }
    )
      .then((data) =>({message : 'Logged out Successfully!'}))
      .catch((e) => {throw e});
  } catch (error) {
    throw error;
  }
}
module.exports = { registerUser, loginUser, logoutUser };
