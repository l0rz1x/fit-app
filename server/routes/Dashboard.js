const express = require("express");
const router = express.Router();
const { NutritionPlan, WorkoutPlan } = require("../models");
const { validateToken } = require("../middlewares/authMiddleware");

// Dashboard için günlük veriler
router.get("/daily", validateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Aktif beslenme planını getir
    const nutritionPlan = await NutritionPlan.findOne({
      where: { userId, isActive: true },
      order: [["createdAt", "DESC"]],
    });

    // Aktif egzersiz planını getir
    const workoutPlan = await WorkoutPlan.findOne({
      where: { userId, isActive: true },
      order: [["createdAt", "DESC"]],
    });

    // Bugünün günü al (Pazartesi=0, Salı=1 formatında)
    const today = new Date().getDay(); // 0=Pazar, 1=Pazartesi...
    const dayIndex = today === 0 ? 6 : today - 1; // Pazartesi=0 yapmak için

    let todayMeals = [];
    let todayWorkout = null;
    let totalCalories = 0;
    let consumedCalories = 0;

    // Beslenme planını parse et
    if (nutritionPlan && nutritionPlan.planData) {
      const planData =
        typeof nutritionPlan.planData === "string"
          ? JSON.parse(nutritionPlan.planData)
          : nutritionPlan.planData;

      console.log("📅 DEBUG - dayIndex:", dayIndex);
      console.log("📋 DEBUG - planData:", JSON.stringify(planData, null, 2));

      // Plandaki gün sayısını kontrol et
      const uniqueDays = [...new Set(planData.map(item => item.gun))];
      console.log("📆 Planda bulunan günler:", uniqueDays);

      // Bugüne ait öğünleri filtrele
      const dayNames = [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
      ];
      const todayName = dayNames[dayIndex];
      const genericDayName = `${dayIndex + 1}. Gün`;

      console.log("🔍 DEBUG - Aranan gün:", todayName, "veya", genericDayName);

      todayMeals = planData.filter((item) => {
        const cleanGun = item.gun ? item.gun.replace(/\s/g, "") : "";
        const cleanGeneric = genericDayName.replace(/\s/g, "");
        const match = (
          item.gun === todayName ||
          cleanGun === cleanGeneric ||
          item.gun?.includes(todayName)
        );
        if (match) {
          console.log("✅ Eşleşen öğün:", item.gun, "-", item.name);
        }
        return match;
      });

      console.log("🍽️ DEBUG - Bulunan öğün sayısı:", todayMeals.length);

      // Eğer bugün için öğün yoksa, alternatif stratejiler dene
      if (todayMeals.length === 0 && planData.length > 0) {
        console.log("⚠️ Bugün için öğün bulunamadı, alternatif aranıyor...");
        
        // Strateji 1: Pazartesi'yi dene
        todayMeals = planData.filter((item) => 
          item.gun === "Pazartesi" || item.gun?.includes("Pazartesi")
        );
        console.log("📌 Pazartesi kontrolü:", todayMeals.length, "öğün");
        
        // Strateji 2: "1. Gün" formatını dene
        if (todayMeals.length === 0) {
          todayMeals = planData.filter((item) => {
            const cleanGun = item.gun ? item.gun.replace(/\s/g, "") : "";
            return cleanGun === "1.Gün" || item.gun === "1. Gün";
          });
          console.log("📌 1. Gün kontrolü:", todayMeals.length, "öğün");
        }
        
        // Strateji 3: İlk mevcut günü kullan
        if (todayMeals.length === 0 && uniqueDays.length > 0) {
          const firstDay = uniqueDays[0];
          todayMeals = planData.filter((item) => item.gun === firstDay);
          console.log("📌 İlk mevcut gün (", firstDay, "):", todayMeals.length, "öğün");
        }
        
        console.log("✅ Final öğün sayısı:", todayMeals.length);
      }

      // Toplam kalori hesapla
      todayMeals.forEach((meal) => {
        let calVal = 0;
        if (typeof meal.calories === "string") {
          calVal = parseInt(meal.calories.replace(/\D/g, "")) || 0;
        } else {
          calVal = meal.calories || 0;
        }
        totalCalories += calVal;
      });
    }

    // Workout planını parse et
    if (workoutPlan && workoutPlan.planData) {
      const workoutData =
        typeof workoutPlan.planData === "string"
          ? JSON.parse(workoutPlan.planData)
          : workoutPlan.planData;

      if (Array.isArray(workoutData) && workoutData[dayIndex]) {
        todayWorkout = workoutData[dayIndex];
      }
    }

    res.json({
      success: true,
      meals: todayMeals,
      workout: todayWorkout,
      calories: {
        total: totalCalories,
        consumed: consumedCalories,
        remaining: totalCalories - consumedCalories,
      },
    });
  } catch (err) {
    console.error("Dashboard veri hatası:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
