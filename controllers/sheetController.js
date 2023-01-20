const User = require("../models/User");
const CharacterSheet = require("../models/CharacterSheet");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access private
const getAllSheets = asyncHandler(async (req, res) => {
});

// @desc Create a new user
// @route POST /users
// @access private
const createNewSheet = asyncHandler(async (req, res) => {
});

// @desc Update a user
// @route PATCH /users
// @access private
const updateSheet = asyncHandler(async (req, res) => {
});

// @desc Delete a user
// @route DELETE /users
// @access private
const deleteSheet = asyncHandler(async (req, res) => {
});

module.exports = {
  getAllSheets,
  createNewSheet,
  updateSheet,
  deleteSheet,
};