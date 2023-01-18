const express = require("express");
const router = express.Router();
const path = require("path");

// This will match if the requested route is only a "/"
// or if the index(.html) has been requested
router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
