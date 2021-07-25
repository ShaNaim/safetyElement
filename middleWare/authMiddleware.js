const jwt = require("jsonwebtoken");
const { secretJWTtoken } = require("../config.js");
const User = require("../model/Users");
const Person = require("../model/Persons");
// get user from Model

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretJWTtoken, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
        //next();
      } else {
        // ****check User Exists****
        next();
      }
    });
  } else return res.redirect("/login");
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretJWTtoken, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.getUser(decodedToken.id);
        let person = await Person.getPerson(user.personid);
        res.locals.user = person;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const requireGuest = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secretJWTtoken, async (err, decodedToken) => {
      if (err) next();
      else {
        res.redirect("/user");
        next();
      }
    });
  } else next();
};

module.exports = { requireAuth, checkUser, requireGuest };
