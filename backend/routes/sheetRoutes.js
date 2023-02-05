const express = require("express");
const router = express.Router();
const sheetController = require("../controllers/sheetController")

router.route("/")
.get(sheetController.getAllSheets)
.post(sheetController.createNewSheet)
.patch(sheetController.updateSheet)
.delete(sheetController.deleteSheet);

router.route("/:userId")
.get(sheetController.getAllSheetsForUser)


module.exports = router;
