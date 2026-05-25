const express = require("express");
const app = express();

const demo = `
<a href="/">Home</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
`;

app.get("/", (req, res) => {
  res.send(`${demo}<h1>Welcome to home page</h1>`);
});

app.get("/about", (req, res) => {
  res.send(`${demo}<h1>Welcome to About page</h1>`);
});

app.get("/contact", (req, res) => {
  res.send(`${demo}<h1>Welcome to contact page</h1>`);
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
