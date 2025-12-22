const express = require("express");
const router = express.Router();
const { ChatLog, WorkoutPlan } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");
const { getAIResponse } = require("../services/aiService");

router.post("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mesaj bos olamaz!!!" });
  }

  try {
    await ChatLog.create({
      userId,
      sender: "user",
      message: message,
    });

    const aiResult = await getAIResponse(message);

    let aiMessage = "";
    let newPlan = null;

    if (!aiResult) {
      aiMessage = "AI servisine ulaşılamadı (Yanıt yok).";
    } else if (aiResult.chat_message) {
      aiMessage = aiResult.chat_message;
    } else if (aiResult.answer) {
      aiMessage = aiResult.answer;
    } else if (aiResult.response) {
      aiMessage = aiResult.response;
    } else if (typeof aiResult === "string") {
      aiMessage = aiResult;
    } else {
      aiMessage = "AI bos bir cevap dondu.";
    }

    await ChatLog.create({
      userId,
      sender: "ai",
      message: aiMessage,
    });

    if (aiResult.workout_plan && aiResult.workout_plan.length > 0) {
      await WorkoutPlan.update({ isActive: false }, { where: { userId } });

      newPlan = await WorkoutPlan.create({
        userId: userId,
        planData: aiResult.workout_plan,
        isActive: true,
      });
    }

    res.json({
      success: true,
      userMessage: message,
      aiMessage: aiMessage,
      updatedPlan: newPlan,
    });
  } catch (err) {
    res.status(500).json({ error: "Mesaj gönderilirken bir hata oluştu." });
  }
});

router.get("/history", validateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await ChatLog.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
      limit: 50,
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
