const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/authMiddleware");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const existing = Users.findOne({ where: { email } });
  if (existing) return res.json("Eposta Zaten kayitli");

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      email: email,
      password: hash,
    });
    res.json("success");
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "Kullanici bulunamadi!!!" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "email ve sifre birbiriyle uyusmuyor!!!" });
      } else {
        const accessToken = sign(
          { email: user.email, id: user.id },
          JWT_SECRET
        );
        res.json({ accessToken: accessToken, email: email, id: user.id });
      }
    });
  }
});
router.get("/check", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
