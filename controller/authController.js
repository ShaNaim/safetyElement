const User = require("../model/Users");
const Person = require("../model/Persons");
const jwt = require("jsonwebtoken");
const { secretJWTtoken } = require("../config");

var locations = {
  cities: ["Dhaka", "Khulna", "Rajshahi", "Borishal", "Chittagong", "Shylet"],
  Dhaka: ["dhaka1", "dhaka2", "dhaka3", "dhaka4"],
  Khulna: ["khulna1", "khulna2", "khulna3", "khulna4"],
  Rajshahi: [],
  Borishal: [],
  Chittagong: [],
  Shylet: [],
};
// Functions
function createJWT(id) {
  return jwt.sign({ id }, secretJWTtoken, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
}

function errorHandler(err) {
  let errors = { email: "", password: "", contact: "" };
  // Duplicate error
  if (err.code === 11000) {
    if (err.keyValue.email)
      errors.email = "Email Already Exists , Please enter another Email";
    if (err.keyValue.contact)
      errors.contact =
        "This Number is already Registered , Please try another Number";
    return errors;
  }

  //Incorrect Email
  if (err.message === "incorrect Email") {
    errors.email = "Email Address Dosen't Exists";
  }

  //Incorrect Password
  if (err.message === "incorrect Password") {
    errors.password = "Incorrect Password , Please try Again";
  }

  // Validation error
  if (err.message.includes("person validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  return errors;
}

// Exports

module.exports.registerView = (req, res) => {
  //res.locals.user = { na me: "Shanaim" };
  res
    .status(200)
    .render("auth/register.ejs", { title: "Register", location: locations });
};

module.exports.loginView = (req, res) => {
  //res.locals.user = { na me: "Shanaim" };
  res.status(200).render("auth/login.ejs", { title: "Login" });
};

module.exports.registerUser = async (req, res) => {
  console.log("Print on LINE 77 BODY /n:", req.body, "END NODY");
  let { firstName, lastName, email, password, contact, dob, gender, address } =
    req.body;
  try {
    console.log("Print on LINE 82", contact, gender, address);
    let newPerson = await Person.addPerson(
      firstName,
      lastName,
      dob,
      gender,
      contact,
      address
    );
    console.log(newPerson);
    if (newPerson) {
      try {
        let status = 1;
        let newUser = await User.addUser(
          email,
          password,
          Number(contact),
          status,
          newPerson._id
        );
        if (newUser) {
          const token = createJWT(newUser._id);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ user: true });
        }
      } catch (error) {
        let result = Person.deleteById(newPerson._id);
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    const errors = errorHandler(error);
    res.status(400).json({ errors });
  }
};

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    if (user) {
      // Create JWT token
      const token = createJWT(user.id);
      // set cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // send id , name
      res.status(200).json({ user: user.id });
    }
  } catch (err) {
    console.log(err);
    const errors = errorHandler(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).redirect("/");
};
