const User = require("../models/User");
const CharacterSheet = require("../models/CharacterSheet");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
  // Do NOT return the password
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  return res.status(200).json(users);
});

// @desc Create a new user
// @route POST /users
// @access private
const createNewUser = asyncHandler(async (req, res) => {
  // Destructure data needed from req.body
  const { username, password, roles } = req.body;

  // Check if data is set
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicates
  const dup = await User.findOne({ username }).lean().exec();
  if (dup) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // All important stuff done, let's create a user
  const newUser = {
    username: username,
    password: hashedPassword,
    roles: roles,
  };
  const createdUser = await User.create(newUser);
  if (createdUser) {
    return res
      .status(201)
      .json({ message: `New user ${createdUser.username} created` });
  } else {
    return res.status(400).json({ message: "Couldn't create new user" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  // Check if data is set
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicates
  const dup = await User.findOne({ username }).lean().exec();
  // check if username already exists
  if (dup && dup?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    const hashedPassword = hashPassword();
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();
  if (updatedUser) {
    return res
      .status(201)
      .json({ message: `User ${updatedUser.username} updated` });
  } else {
    return res.status(400).json({ message: "Couldn't update user" });
  }
});

// @desc Delete a user
// @route DELETE /users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  // if a user has character sheets
  const charactersheet = await CharacterSheet.findOne({ user: id })
    .lean()
    .exec();
  if (charactersheet) {
    return res.status(400).json({ message: "User still has characters" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();
  const reply = `Username ${result.username} with id ${result._id} has been deleted`;

  return res.status(200).json({ message: reply });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}
