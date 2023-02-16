const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  players: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sheet" }],
  keeper: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  active: { // Allow Admins to disable users, in case of a convention or something
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Session", sessionSchema)