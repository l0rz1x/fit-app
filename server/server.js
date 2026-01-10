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

const chatRouter = require("./routes/Chat");
app.use("/chat", chatRouter);

const NutritionChatRouter = require("./routes/NutritionChat");
app.use("/nutritionChat", NutritionChatRouter);

const dashboardRouter = require("./routes/Dashboard");
app.use("/dashboard", dashboardRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
});
