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
      is_user: chat.sender === "user",
      text: chat.message,
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

    console.log("🤖 AI İSTEĞİ GÖNDERİLİYOR..."); // LOG 1
    const aiResult = await getNutritionResponse(nutritionPayload);

    // --- LOG 2: BURASI KRİTİK, AI NE DÖNÜYOR GÖRELİM ---
    console.log("📦 AI CEVABI (HAM VERİ):", JSON.stringify(aiResult, null, 2));
    // ----------------------------------------------------

    let aiMessage = "Beslenme uzmanına ulaşılamadı.";
    let dietPlan = null;
    let recipeCards = null;

    if (aiResult) {
      aiMessage = aiResult.chat_message;

      // Plan kontrolü
      if (aiResult.diet_plan && aiResult.diet_plan.length > 0) {
        console.log("✅ DİYET PLANI BULUNDU! Veritabanına kaydediliyor..."); // LOG 3

        dietPlan = aiResult.diet_plan;
        await NutritionPlan.update({ isActive: false }, { where: { userId } });

        await NutritionPlan.create({
          userId,
          planData: dietPlan,
          isActive: true,
        });
        console.log("💾 Veritabanı kaydı başarılı."); // LOG 4
      } else {
        console.log("⚠️ AI cevap döndü ama içinde 'diet_plan' yok."); // LOG 5
      }

      if (aiResult.recipe_cards && aiResult.recipe_cards.length > 0) {
        recipeCards = aiResult.recipe_cards[0];
      }
    }

    await NutritionChat.create({
      userId,
      sender: "ai",
      message: aiMessage,
      recipeCards: recipeCards,
    });

    res.json({
      success: true,
      userMessage: query,
      aiMessage: aiMessage,
      dietPlan: dietPlan,
      recipeCards: recipeCards,
    });
  } catch (err) {
    console.error("❌ HATA:", err); // LOG 6
    res.status(500).json({ error: err ? err.message : "Bir hata oluştu" });
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
    res.status(500).json({ error: err ? err.message : "Bir hata oluştu" });
  }
});
module.exports = router;
