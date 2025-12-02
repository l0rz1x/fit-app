const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./models/Users");
app.use("auth", usersRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(5002, () => {
    console.log("server started at 5002");
  });
});
