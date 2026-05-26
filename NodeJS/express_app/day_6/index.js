const express = require("express");
const app = express();

app.set("view engine", "ejs");

const home = {
  head: "Welcome to My Portfolio",
  para: "I am a Web Developer passionate about creating websites.",
};

const about = {
  head: "About me",
  para: "I am a Frontend Developer skilled in HTML, CSS, JavaScript, React, and Node.js.",
};
const services = {
  one: "",
};

app.get("/", (req, res) => {
  res.render("Home", { data: home });
});
app.get("/contact", (req, res) => {
  res.render("Contact.ejs", { data: about });
});
app.get("/About", (req, res) => {
  res.render("About.ejs", { data: about });
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
