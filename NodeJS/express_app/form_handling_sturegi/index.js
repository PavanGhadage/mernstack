const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));
const arr = [];

app.get("/", (req, res) => {
  res.render("Home.ejs");
});

app.post("/form", (req, res) => {
  //   const arr = [req.body];
  arr.push(req.body);
  res.render("form.ejs", { data: arr });
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
