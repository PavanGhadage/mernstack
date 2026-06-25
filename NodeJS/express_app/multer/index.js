const express = require("express");

const app = express();

const multer = require("multer");

const connection = require("./config/db");
const UserSchema = require("./model/UserSchema");
const { name } = require("ejs");
const HOST = "127.0.0.1";
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));
app.use(express.json());
//multer connection

const Storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const fileupload = multer({
  storage: Storage,
});
connection();

app.get("/", (req, res) => {
  res.render("Home.ejs");
});

//for create

app.post("/upload", fileupload.single("image"), async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const image = req.file.filename;
    const result = new UserSchema({ name, age, email, image });
    await result.save();
    res.redirect("/display");
  } catch (err) {
    console.log(err);
  }
});
//read
app.get("/display", async (req, res) => {
  try {
    const result = await UserSchema.find();
    res.render("Display.ejs", { data: result });
  } catch (err) {
    console.log(err);
  }
});

// delete

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await UserSchema.findByIdAndDelete(id);
  res.redirect("/display");
});

//edit
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const result = await UserSchema.findById(id);
  res.render("edit.ejs", { data: result });
});

//update

app.post("/update/:id", fileupload.single("image"), async (req, res) => {
  let id = req.params.id;
  let { name, age, email } = req.body;
  const updatedata = {
    name: name,
    age: age,
    email: email,
  };

  if (req.file) {
    if (req.file.filename) {
      updatedata.image = req.file.filename;
    }
  }
  await UserSchema.findByIdAndUpdate(id, updatedata);

  res.redirect("/display");
});

app.listen(PORT, HOST, () => {
  console.log(`Server Running at http://${HOST}:${PORT}`);
});
