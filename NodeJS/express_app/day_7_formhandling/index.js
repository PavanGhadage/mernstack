const express = require("express");
const app = express();

app.use(express.static("public/"));
const url = require("url");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});
//for get
app.get("/formdata", (req, res) => {
  const result = url.parse(req.url, true);
  console.log(result.query);

  res.render("form.ejs", {
    data: result.query,
  });
});
//for post
app.post("/formdata", (req, res) => {
  console.log(req.body);

  res.render("post.ejs", {
    data: req.body,
  });
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
