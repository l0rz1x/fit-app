const express = require("express");
const router = express.Router();
const { Profile, WorkoutPlan, ChatLog } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");
const { getAIResponse } = require("../services/aiService");

router.post("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const userToken = req.token;
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
    let profile;
    let existing = await Profile.findOne({ where: { userId } });

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
      profile = existing;
    } else {
      profile = await Profile.create({
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
    }

    const message = `Ben ${age} yaşında,
      ${weight}kg ağırlığında,
      ${height}cm boyunda bir ${gender}im.
      Hedefim: ${goal}.
      Bana uygun başlangıç
      seviyesi bir fitness programı hazırlar mısın?`;

    const aiResult = await getAIResponse(message, userToken);

    if (!aiResult) {
      return res.status(503).json({
        success: true,
        profile,
        message: "Profil oluşturuldu ancak AI servisine şu an ulaşılamıyor.",
      });
    }
    if (aiResult.workout_plan && aiResult.workout_plan.length > 0) {
      await WorkoutPlan.create({
        userId: userId,
        planData: aiResult.workout_plan,
        isActive: true,
      });
    }
    await ChatLog.create({ userId, sender: "user", message: message });

    if (aiResult.chat_message) {
      await ChatLog.create({
        userId,
        sender: "ai",
        message: aiResult.chat_message,
      });
    }

    res.status(201).json({
      success: true,
      profile,
      initialPlan: aiResult.workout_plan,
      message: aiResult.chat_message,
    });
  } catch (err) {
    console.error("Profile Route Hatası:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", validateToken, async (req, res) => {
  const userId = req.user.id;

  const profile = await Profile.findOne({ where: { userId } });

  const activePlan = await WorkoutPlan.findOne({
    where: {
      userId: userId,
      isActive: true,
    },
    order: [["createdAt", "DESC"]],
  });
  res.json({
    profile: profile,
    workoutPlan: activePlan,
  });
});

module.exports = router;
