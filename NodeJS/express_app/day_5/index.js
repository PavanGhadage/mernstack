const express = require("express");
const app = express();
app.use(express.static("public/"));
app.get("/", (req, res) => {
  //   res.send(`<h1>this is home page</h1>`);
  res.send(`<img src="img1.jpeg"/>`);
});

app.get("/contact", (req, res) => {
  res.send(`<h1>this is  contact</h1>`);
});

app.get("/services", (req, res) => {
  res.send(`<h1>this is service page</h1>`);
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
