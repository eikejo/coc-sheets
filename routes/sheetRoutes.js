const express = require("express");
const router = express.Router();
const sheetController = require("../controllers/sheetController")

router.route("/")
.get(sheetController.getAllSheets)
.post(sheetController.createNewSheet)
.patch(sheetController.updateSheet)
.delete(sheetController.deleteSheet);

module.exports = router;
