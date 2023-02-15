const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  keeper: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  active: { // Allow Admins to disable users, in case of a convention or something
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Session", sessionSchema)