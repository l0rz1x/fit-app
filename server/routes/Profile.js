const express = require("express");
const router = express.Router();
const { Profile } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const {
    fullname,
    age,
    weight,
    height,
    gender,
    activityLevel,
    goal,
    targetWeight,
  } = req.body;

  try {
    const existing = await Profile.findOne({ where: { userId } });

    if (existing) {
      await existing.update({
        fullname,
        age,
        weight,
        height,
        gender,
        activityLevel,
        goal,
        targetWeight,
      });
      return res.json({ message: "Profile updated", profile: existing });
    }

    const profile = await Profile.create({
      userId,
      fullname,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
      targetWeight,
    });

    res.json({ message: "Profile created", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", validateToken, async (req, res) => {
  const userId = req.user.id;

  const profile = await Profile.findOne({ where: { userId } });

  res.json(profile);
});

module.exports = router;
