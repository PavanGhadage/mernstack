const express = require("express");
const app = express();

const connection = require("./config/db");
const Student = require("./model/empschema");

connection();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Form Page
app.get("/", (req, res) => {
  res.render("Home");
});

// Save Data
app.post("/form", async (req, res) => {
  const student = new Student(req.body);
  await student.save();

  res.redirect("/formdata");
});

// Display Page
app.get("/formdata", async (req, res) => {
  const result = await Student.find();
  res.render("display.ejs", { data: result });
  // res.send("<h1> display page</h1>");
});
//delete
app.get("/delete/:id", async (req, res) => {
  const result = req.params.id;
  await Student.findByIdAndDelete(result);
  res.redirect("/formdata");
});
//edit
app.get("/edit/:id", async (req, res) => {
  const myid = req.params.id;
  const result = await Student.findById(myid);
  res.render("update.ejs", { data: result });
});
//update
app.post("/update/:id", async (req, res) => {
  const myid = req.params.id;
  const updatersult = req.body;
  const result = await Student.findByIdAndUpdate(myid, updatersult);
  res.redirect(`/formdata`);
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server Running at http://${HOST}:${PORT}`);
});
