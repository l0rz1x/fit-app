const express = require("express");
const router = express.Router();
// DİKKAT: Profile modelini de buraya ekledik
const { Users, Profile } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/authMiddleware");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const existing = await Users.findOne({ where: { email } });
  if (existing) {
    return res.json("Eposta Zaten kayitli");
  }

  // Promise zinciri yerine async/await ile daha temiz yazdım
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

    // --- YENİ EKLENEN KISIM BAŞLANGIÇ ---
    // Kullanıcının profili var mı kontrol et
    const userProfile = await Profile.findOne({ where: { userId: user.id } });

    // Eğer userProfile doluysa true, boşsa (null) false olur
    const hasProfile = !!userProfile;
    // --- YENİ EKLENEN KISIM BİTİŞ ---

    const accessToken = sign({ email: user.email, id: user.id }, JWT_SECRET);

    // Frontend'e hasProfile bilgisini de gönderiyoruz
    res.json({
      accessToken: accessToken,
      email: email,
      id: user.id,
      hasProfile: hasProfile, // <-- Frontend buna bakıp yönlendirecek
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/check", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
