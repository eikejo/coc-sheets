const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    default: "Player" // Player, Keeper, Admin
  }],
  active: { // Allow Admins to disable users, in case of a convention or something
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema)