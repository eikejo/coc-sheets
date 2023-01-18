const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// receive and parse json data, this one is based on body-parser, so no need to install bp
app.use(express.json())

// dirname is a global variable looking inside the current folder
// This is useful for static files f.e. css files or 404 pages
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

// Catch all route in case of errors
app.all("*", (req, res) => {
    res.status(404)
    // Depending on who's or what's asking we're sending back a different kind of 404 message 
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts("json")) {
        res.json({"message": "404 not found"})
    } else {
        res.type("txt").send("404 not found")
    }
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
