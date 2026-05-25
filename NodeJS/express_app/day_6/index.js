const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render("Home.ejs");
});
app.get("/contact", (req, res) => {
  res.render("Contact.ejs");
});
app.get("/About", (req, res) => {
  res.render("About.ejs");
});
app.get("/services", (req, res) => {
  res.render("Services.ejs");
});
app.get("/skill", (req, res) => {
  res.render("Skill.ejs");
});
const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
