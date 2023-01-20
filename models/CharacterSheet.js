const mongoose = require("mongoose");

const characterSheetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    // description
    charactername: { type: String, default: "---" },
    birthplace: { type: String, default: "---" },
    pronoun: { type: String, default: "---" },
    occupation: { type: String, default: "---" },
    residence: { type: String, default: "---" },
    age: { type: Number, default: 0 },

    // characteristics
    HP: { type: Number, default: 0 },
    MP: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    size: { type: Number, default: 0 },
    dexterity: { type: Number, default: 0 },
    appearance: { type: Number, default: 0 },
    luck: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    education: { type: Number, default: 0 },
    sanity: { type: Number, default: 0 },
    constitution: { type: Number, default: 0 },
    power: { type: Number, default: 0 },

    // TODO: Skills, Combat, Story, Backstory, etc... ok for the beginning but needed when everything works
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sheet", characterSheetSchema);
