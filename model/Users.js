const User = require("./User");
const bcrypt = require("bcrypt");

module.exports.addUser = async function (
  email,
  password,
  aultid,
  status,
  personid
) {
  try {
    const user = await User.create({
      email,
      password,
      aultid,
      status,
      personid,
    });
    if (user) return user;
    else throw Error("Custome error : Error at model/Users.create");
  } catch (error) {
    throw error;
  }
};

module.exports.getUser = async function (id) {
  const key = id;
  try {
    if (key) {
      let user = await User.findById(key);
      if (user) return user;
      else return null;
    } else return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports.login = async function (email, password) {
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return {
        id: user._id,
        status: user.status,
      };
    } else throw Error("incorrect Password");
  } else throw Error("incorrect Email");
};
