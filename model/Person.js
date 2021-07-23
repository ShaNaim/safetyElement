const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  lastName: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: [false, "Enter Your Date of Birth"],
  },
  gender: {
    type: String,
    required: [true, "Select Your Gender"],
  },
  contact: {
    type: Number,
    required: [true, "Enter Your Contact Number"],
    unique: true,
  },

  address: {
    type: String,
    required: [true, "Please Enter a Address"],
  },
});

//hooks

const Person = mongoose.model("person", personSchema);
module.exports = Person;
