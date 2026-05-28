const express = require("express");
const app = express();
const url = require("url");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//for get

app.get("/", (req, res) => {
  const result = url.parse(req.url, true);

  const arr = [result.query];

  res.render("Home", { data: arr });
});
//for post
app.post("/", (req, res) => {
  const result = [req.body];

  res.render("Home", { data: result });
});

app.get("/role", (req, res) => {
  res.render("addrole");
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
