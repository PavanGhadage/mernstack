const express = require("express");
const cors = require("cors");

const app = express();

const connection = require("./config/db");
connection();

require("./models/UserSchema");

const login = require("./routes/LoginRoutes");
const register = require("./routes/RegisterRoutes");

app.use(cors()); // ✅ Add this line
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const useroutes = require("./routes/useroutes");
app.use("/api/users", useroutes);

app.use("/api/login", login);
app.use("/api/login", register);

const PORT = 3000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
