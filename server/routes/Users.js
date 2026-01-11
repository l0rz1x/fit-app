const express = require("express");
const router = express.Router();
const { Users, Profile } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/authMiddleware");
const { sign } = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const existing = await Users.findOne({ where: { email } });
  if (existing) {
    return res.json("Eposta Zaten kayitli");
  }

  const hash = await bcrypt.hash(password, 10);
  await Users.create({
    email: email,
    password: hash,
  });
  res.json("success");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ error: "Kullanici bulunamadi!!!" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ error: "email ve sifre birbiriyle uyusmuyor!!!" });
    }

    const userProfile = await Profile.findOne({ where: { userId: user.id } });

    const hasProfile = !!userProfile;

    const accessToken = sign({ email: user.email, id: user.id }, JWT_SECRET);

    res.json({
      accessToken: accessToken,
      email: email,
      id: user.id,
      hasProfile: hasProfile,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Bu e-posta ile kayıtlı kullanıcı yok." });
    }

    const token = crypto.randomBytes(20).toString("hex");

    await user.update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fitnutrition787@gmail.com",
        pass: "akem snik tabq zamv",
      },
    });

    const mailOptions = {
      from: "FitApp Destek <no-reply@fitapp.com>",
      to: user.email,
      subject: "Şifre Sıfırlama İsteği",
      text: `Şifrenizi sıfırlamak için lütfen şu linke tıklayın:\n\n
      http://localhost:5173/reset-password?token=${token}\n\n
      Bu isteği siz yapmadıysanız görmezden gelin.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Sıfırlama linki e-posta adresinize gönderildi." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Mail gönderilirken hata oluştu." });
  }
});

router.post("password ", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Geçersiz veya süresi dolmuş token." });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await user.update({
      password: hash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    res.json({
      message: "Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/check", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
