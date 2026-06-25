const express = require("express");
const multer = require("multer");

const app = express();

require("./config/db");

const User = require("./model/UserSchema");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Multer Configuration
const Storage = multer.diskStorage({
  destination: "public/uploads/",

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: Storage,
});

// Home Page
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const user = new User({
      title: req.body.title,
      image: req.file.filename,
    });

    await user.save();

    res.redirect("/display");
  } catch (error) {
    console.log(error);
    res.send("Upload Failed");
  }
});

// Display Route
app.get("/display", async (req, res) => {
  try {
    const result = await User.find()

    res.render("display.ejs", {
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server Running at http://${HOST}:${PORT}`);
});
