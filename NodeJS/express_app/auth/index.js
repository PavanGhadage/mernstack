const express = require("express");

const app = express();

const connection = require("./config/db");
const User = require("./model/useSchema");
const bcrypt = require("bcryptjs");
const session = require("express-session");

connection();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "pavanghadage",
  }),
);
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  if (req.session.token) {
    return res.render("Home");
  } else {
    return res.send(`
      <script>
        alert("Session expired");
        window.location.assign("/");
      </script>
    `);
  }
});

app.get("/", async (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashpass = await bcrypt.hash(password, 10);

    const result = new User({ name, email, password: hashpass });
    await result.save();
    res.redirect("/");
    console.log("successful");
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailexit = await User.findOne({ email });

    if (!emailexit) {
      return res.send(
        `<script>alert('User Not Exists');window.location.assign('/')</script>`,
      );
    }

    const passwordexit = await bcrypt.compare(password, emailexit.password);

    if (!passwordexit) {
      return res.send(
        `<script>alert('Password is incorrect');window.location.assign('/')</script>`,
      );
    }

    if (passwordexit && emailexit) {
      try {
        req.session.token = emailexit._id;
        res.redirect("/home");
      } catch (err) {
        res.send("Internal Server Error");
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
});

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
