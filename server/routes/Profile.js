const express = require("express");
const router = express.Router();
const { Profile } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

router.post("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const { age, weight, height, gender, activityLevel, goal } = req.body;

  try {
    const existing = await Profile.findOne({ where: { userId } });

    if (existing) {
      await existing.update({
        age,
        weight,
        height,
        gender,
        activityLevel,
        goal,
      });
      return res.json({ message: "Profile updated", profile: existing });
    }

    const profile = await Profile.create({
      userId,
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal,
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
