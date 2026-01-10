const express = require("express");
const router = express.Router();
const { Profile, WorkoutPlan, ChatLog, NutritionPlan } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");
const { getAIResponse } = require("../services/aiService");
const { getNutritionResponse } = require("../services/nutritionAiService");

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
      hareket halim ${activityLevel},
      Hedefim: ${goal} ve hedef kilom ${targetWeight}.
      Bana uygun başlangıç
      seviyesi bir fitness programı hazırlar mısın?`;

    const aiResult = await getAIResponse(message);

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

    const nutritionMessage = `Ben ${age} yaşında,
      ${weight}kg ağırlığında,
      ${height}cm boyunda bir ${gender}im.
      hareket halim ${activityLevel},
      Hedefim: ${goal} ve hedef kilom ${targetWeight}.
      Bana uygun başlangıç
      seviyesi bir beslenme programı hazırlar mısın?`;

    const nutritionPayload = {
      user_id: userId.toString(),
      history: [],
      query: nutritionMessage,
    };
    const nutritionAiResult = await getNutritionResponse(nutritionPayload);
    let savedNutrition = null;
    if (
      nutritionAiResult &&
      nutritionAiResult.diet_plan &&
      nutritionAiResult.diet_plan.length > 0
    ) {
      await NutritionPlan.update({ isActive: false }, { where: { userId } });

      savedNutrition = await NutritionPlan.create({
        userId,
        planData: nutritionAiResult.diet_plan,
        isActive: true,
      });
    }

    res.status(201).json({
      success: true,
      profile,
      initialPlan: aiResult ? aiResult.workout_plan : null,
      message: aiResult
        ? aiResult.chat_message
        : "Workout planı şu an oluşturulamadı, daha sonra tekrar deneyin.",
      initialNutritionPlan: nutritionAiResult
        ? nutritionAiResult.diet_plan
        : null,
      nutritionMessage: nutritionAiResult
        ? nutritionAiResult.chat_message
        : "Beslenme planı şu an oluşturulamadı, daha sonra tekrar deneyin.",
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

  const nutritionPlan = await NutritionPlan.findOne({
    where: {
      userId: userId,
      isActive: true,
    },
    order: [["createdAt", "DESC"]],
  });
  res.json({
    user: req.user,
    profile: profile,
    workoutPlan: activePlan,
    nutritionPlan: nutritionPlan,
  });
});

module.exports = router;
