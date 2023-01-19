require("dotenv").config();
const express = require("express");
const path = require("path");
const { logger, logEvent } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// --- middleware ---

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// --- routing --- 
// dirname is a global variable looking inside the current folder
// This is useful for static files f.e. css files or 404 pages
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.use("/users", require("./routes/userRoutes"))

// Catch all route in case of errors
app.all("*", (req, res) => {
  res.status(404);
  // Depending on who's or what's asking we're sending back a different kind of 404 message
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

// Only listen if we've got a db connection
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(
      `Server is listening on ${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
});

mongoose.connection.once("error", (err) => {
  console.log(err);
  logEvent(
    `${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,
    "dbError-" + new Date().toISOString().split("T")[0] + ".log"
  );
});
