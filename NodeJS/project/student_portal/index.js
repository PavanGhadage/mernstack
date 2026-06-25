const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const data = require("./data");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("Home.ejs", { homedata: data });
});

app.get("/courses", (req, res) => {
  res.render("courses.ejs", { coursedata: data });
});

app.get("/viewcourse/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const course = data.find((c) => c.id === id);

  res.render("viewcourses.ejs", { mydata: course });
});

app.get("/search", (req, res) => {
  //   const { category, trainer } = req.query;
  const category = req.query.category;
  const trainer = req.query.trainer;

  let results = data;

  if (category) {
    results = results.filter((course) =>
      course.category.toLowerCase().includes(category.toLowerCase()),
    );
  }

  if (trainer) {
    results = results.filter((course) =>
      course.trainer.toLowerCase().includes(trainer.toLowerCase()),
    );
  }

  res.render("search.ejs", {
    results,
    category,
    trainer,
  });
});

// app.post("/register", (req, res) => {
//   const result = req.body;
//   res.render("success.ejs", {
//     student: result,
//   });
// });
app.get("/register", (req, res) => {
  res.render("register.ejs", { coursedata: data });
});

app.post("/register", (req, res) => {
  res.render("success.ejs", {
    student: req.body,
  });
});
app.use((req, res) => {
  res.render("fallback.ejs");
});
const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {

  console.log(`server is running on http://${HOST}:${PORT}`);
  
});
