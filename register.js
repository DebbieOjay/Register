const mongoose = require("mongoose");

const { Schema } = mongoose;

const regSchema = new Schema({
  fullName: { type: String, required: true
   },
  email: { type: String },
  phone: Number,
  message: String,
});

const Register = mongoose.model("Register", regSchema);

module.exports = Register;