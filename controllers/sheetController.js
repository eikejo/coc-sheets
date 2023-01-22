const User = require("../models/User");
const CharacterSheet = require("../models/CharacterSheet");
const asyncHandler = require("express-async-handler");

// @desc Get all sheets
// @route GET /sheets
// @access private
const getAllSheets = asyncHandler(async (req, res) => {
  const sheets = await CharacterSheet.find({}).exec();
  if (!sheets?.length) {
    return res.status(400).json({ message: "No sheets found" });
  }
  return res.status(200).json(sheets);
});

// @desc Get all sheets for a specific user
// @route GET /sheets/:userid
// @access private
const getAllSheetsForUser = asyncHandler(async (req, res) => {
  const sheets = await CharacterSheet.find({ user: req.params.userId }).exec();
  if (!sheets?.length) {
    return res.status(400).json({
      message: `No sheets found for user with id ${req.params.userId}`,
    });
  }
  return res.status(200).json(sheets);
});

// @desc Create a new sheet
// @route POST /sheets
// @access private
const createNewSheet = asyncHandler(async (req, res) => {
  const {
    user,
    charactername,
    birthplace,
    pronoun,
    occupation,
    residence,
    age,
    HP,
    MP,
    strength,
    size,
    dexterity,
    appearance,
    luck,
    intelligence,
    education,
    sanity,
    constitution,
    power,
  } = req.body;

  // We may have duplicate sheets, so no need to check for duplicates I guess

  const newSheet = {
    user: user,
    charactername: charactername,
    birthplace: birthplace,
    pronoun: pronoun,
    occupation: occupation,
    residence: residence,
    age: age,
    HP: HP,
    MP: MP,
    strength: strength,
    size: size,
    dexterity: dexterity,
    appearance: appearance,
    luck: luck,
    intelligence: intelligence,
    education: education,
    sanity: sanity,
    constitution: constitution,
    power: power,
  };
  const createdSheet = await CharacterSheet.create(newSheet);
  if (createdSheet) {
    return res.status(201).json({message: "Sheet has been created"});
  } else {
    return res.status(400).json({ message: "Couldn't create new sheet" });
  }
});

// @desc Update a sheet
// @route PATCH /sheets
// @access private
const updateSheet = asyncHandler(async (req, res) => {
  const {
    id,
    user,
    charactername,
    birthplace,
    pronoun,
    occupation,
    residence,
    age,
    HP,
    MP,
    strength,
    size,
    dexterity,
    appearance,
    luck,
    intelligence,
    education,
    sanity,
    constitution,
    power,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  existingSheet = await CharacterSheet.findById(id).exec();
  if (!existingSheet) {
    return res.status(400).json({ message: "No existing sheet found" });
  }

  existingSheet.id = id;
  existingSheet.user = user;
  existingSheet.charactername = charactername;
  existingSheet.birthplace = birthplace;
  existingSheet.pronoun = pronoun;
  existingSheet.occupation = occupation;
  existingSheet.residence = residence;
  existingSheet.age = age;
  existingSheet.HP = HP;
  existingSheet.MP = MP;
  existingSheet.strength = strength;
  existingSheet.size = size;
  existingSheet.dexterity = dexterity;
  existingSheet.appearance = appearance;
  existingSheet.luck = luck;
  existingSheet.intelligence = intelligence;
  existingSheet.education = education;
  existingSheet.sanity = sanity;
  existingSheet.constitution = constitution;
  existingSheet.power = power;

  const updatedSheet = await existingSheet.save();
  if (updatedSheet) {
    return res.status(200).json({ message: `Updated sheet with id ${id}` });
  } else {
    return res
      .status(400)
      .json({ message: `Couldn't update sheet with id ${id}` });
  }
});

// @desc Delete a sheet
// @route DELETE /sheets
// @access private
const deleteSheet = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  const existingSheet = await CharacterSheet.findById(id).exec();
  if (!existingSheet) {
    return res.status(400).json({ message: `Sheet with id ${id} not found` });
  }

  const result = existingSheet.delete();
  return res
    .status(200)
    .json({ message: `Sheet with id ${result._id} has been deleted` });
});

module.exports = {
  getAllSheets,
  getAllSheetsForUser,
  createNewSheet,
  updateSheet,
  deleteSheet,
};
