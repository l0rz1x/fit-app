const express = require("express");
const router = express.Router();
const { ChatLog, Profile, NutritionPlan, NutritionChat } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

const { getNutritionResponse } = require("../services/nutritionAiService");

router.post("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Lütfen 'query' alanını gönderin." });
  }

  try {
    const userProfile = await Profile.findOne({ where: { userId } });
    if (!userProfile)
      return res.status(404).json({ error: "Profil bulunamadı." });

    const pastChats = await NutritionChat.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    const history = pastChats.reverse().map((chat) => ({
      role: chat.sender,
      content: chat.message,
    }));

    await NutritionChat.create({
      userId,
      sender: "user",
      message: query,
    });

    const nutritionPayload = {
      user_id: userId.toString(),
      history: history,
      query: query,
    };

    const aiResult = await getNutritionResponse(nutritionPayload);

    let aiMessage = "Beslenme uzmanına ulaşılamadı.";
    let dietPlan = null;
    let recipeCard = null;

    if (aiResult) {
      aiMessage = aiResult.chat_message;

      if (aiResult.diet_plan && aiResult.diet_plan.length > 0) {
        dietPlan = aiResult.diet_plan;
        await NutritionPlan.update({ isActive: false }, { where: { userId } });

        await NutritionPlan.create({
          userId,
          planData: dietPlan,
          isActive: true,
        });
      }

      if (aiResult.recipe_card) {
        recipeCard = aiResult.recipe_card;
      }
    }

    await NutritionChat.create({
      userId,
      sender: "ai",
      message: aiMessage,
    });
    res.json({
      success: true,
      userMessage: query,
      aiMessage: aiMessage,
      dietPlan: dietPlan,
      recipeCard: recipeCard,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history", validateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const history = await NutritionChat.findAll({
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
