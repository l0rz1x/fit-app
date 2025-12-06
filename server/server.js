require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = require("./models");

const PORT = process.env.PORT;

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const profileRouter = require("./routes/Profile");
app.use("/profile", profileRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
});
