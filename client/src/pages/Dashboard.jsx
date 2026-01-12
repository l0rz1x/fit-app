import React, { useState, useEffect } from "react";
// axios importunu kaldırdık, yerine api.js fonksiyonunu aldık
import { getUserProfile } from "../services/api";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedMeals, setCheckedMeals] = useState({});
  const [selectedDay, setSelectedDay] = useState("Pazartesi");
  const [fullPlanData, setFullPlanData] = useState([]);
  const [workoutPlanData, setWorkoutPlanData] = useState(null);
  const [userName, setUserName] = useState("User");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [waterGlasses, setWaterGlasses] = useState(0);

  const waterGoal = 8;

  const daysList = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  // Tarih Formatla
  const getTodayFormatted = () => {
    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const today = new Date();
    return `${days[today.getDay()]}, ${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`;
  };

  // Selamlama
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };

  const checkboxTickSvg = `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`;

  // --- VERİ ÇEKME (getUserProfile ile) ---
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // api.js üzerinden veriyi çekiyoruz (Token otomatik eklenir)
        const data = await getUserProfile();
        console.log("📥 Dashboard Profil Verisi:", data);

        // 1. İSMİ ÇEKME
        // Backend yapısında isim genelde data.profile.fullname içindedir
        if (data.profile && data.profile.fullname) {
          setUserName(data.profile.fullname);
        } else if (data.user && data.user.username) {
          setUserName(data.user.username);
        }

        // 2. BESLENME PLANINI ÇEKME (Sağlam Parse Mantığı)
        let planData = [];
        if (data.nutritionPlan && data.nutritionPlan.planData) {
          const rawData = data.nutritionPlan.planData;

          // String ise parse et
          if (typeof rawData === "string") {
            try {
              planData = JSON.parse(rawData);
            } catch (e) {
              console.error("JSON Parse Hatası:", e);
              planData = [];
            }
          } else if (typeof rawData === "object") {
            planData = rawData;
          }

          // Nested yapı kontrolü ({ diet_plan: [...] })
          if (
            !Array.isArray(planData) &&
            planData.diet_plan &&
            Array.isArray(planData.diet_plan)
          ) {
            planData = planData.diet_plan;
          }

          // Array değilse array içine al
          if (!Array.isArray(planData)) {
            planData =
              planData && typeof planData === "object" ? [planData] : [];
          }
        }
        setFullPlanData(planData);

        // 3. WORKOUT PLANINI ÇEKME
        let workoutData = null;
        if (data.workoutPlan && data.workoutPlan.planData) {
          // Workout verisi genelde direkt array veya string gelir
          workoutData =
            typeof data.workoutPlan.planData === "string"
              ? JSON.parse(data.workoutPlan.planData)
              : data.workoutPlan.planData;
        }
        setWorkoutPlanData(workoutData);

        // LocalStorage İlerleme
        try {
          const saved = localStorage.getItem("myWorkoutProgress");
          setCompletedExercises(saved ? JSON.parse(saved) : []);
        } catch (e) {
          setCompletedExercises([]);
        }
      } catch (error) {
        console.error("Dashboard veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // --- GÜN DEĞİŞİMİ VE FİLTRELEME ---
  useEffect(() => {
    // Veri yoksa sıfırla
    if (!fullPlanData || fullPlanData.length === 0) {
      setDashboardData({
        meals: [],
        workout: null,
        calories: { total: 0, consumed: 0, remaining: 0 },
      });
      return;
    }

    // --- BESLENME FİLTRESİ (1. Gün / Pazartesi Eşleşmesi) ---
    const dayIndex = daysList.indexOf(selectedDay);
    const genericDayName = `${dayIndex + 1}. Gün`; // "1. Gün"
    const genericDayNameNoSpace = `${dayIndex + 1}.Gün`; // "1.Gün"
    const genericDayEng = `Day ${dayIndex + 1}`; // "Day 1"

    // Önce Nested yapı kontrolü (recipes_cards)
    let todayMeals = [];
    const dayObject = fullPlanData.find((item) => {
      const dName = (item.day || item.gun || "").toString().trim();
      // Pazar istisnası
      if (selectedDay === "Pazar") {
        return (
          dName === "Pazar" ||
          (dName.includes("Pazar") && !dName.includes("Pazartesi")) ||
          dName === genericDayName
        );
      }
      return (
        dName === selectedDay ||
        dName.includes(selectedDay) ||
        dName === genericDayName
      );
    });

    if (dayObject && Array.isArray(dayObject.recipes_cards)) {
      todayMeals = dayObject.recipes_cards;
    } else {
      // Düz liste kontrolü
      todayMeals = fullPlanData.filter((item) => {
        const dName = (item.day || item.gun || "").toString().trim();
        if (selectedDay === "Pazar") {
          return (
            dName === "Pazar" ||
            (dName.includes("Pazar") && !dName.includes("Pazartesi")) ||
            dName === genericDayName
          );
        }
        return (
          dName === selectedDay ||
          dName === genericDayName ||
          dName === genericDayNameNoSpace ||
          dName === genericDayEng ||
          dName.includes(selectedDay)
        );
      });
    }

    // --- WORKOUT FİLTRESİ ---
    let todayWorkout = null;
    if (workoutPlanData && Array.isArray(workoutPlanData)) {
      todayWorkout =
        workoutPlanData.find((item) => {
          if (!item.day) return false;
          if (selectedDay === "Pazar") {
            return (
              item.day.includes("Pazar") && !item.day.includes("Pazartesi")
            );
          }
          return item.day.includes(selectedDay);
        }) || null;
    }

    // Toplam Kalori
    const totalCalories = todayMeals.reduce((total, meal) => {
      const calVal =
        typeof meal.calories === "string"
          ? parseInt(meal.calories.replace(/\D/g, "")) || 0
          : meal.calories || 0;
      return total + calVal;
    }, 0);

    setDashboardData({
      meals: todayMeals,
      workout: todayWorkout,
      calories: { total: totalCalories, consumed: 0, remaining: totalCalories },
    });

    // Checkboxları sıfırla
    const initialChecked = {};
    todayMeals.forEach((_, idx) => {
      initialChecked[idx] = false;
    });
    setCheckedMeals(initialChecked);
  }, [fullPlanData, selectedDay, workoutPlanData, completedExercises]);

  const handleMealCheck = (index, calories) => {
    setCheckedMeals((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const calculateConsumedCalories = () => {
    if (!dashboardData?.meals) return 0;
    return dashboardData.meals.reduce((total, meal, idx) => {
      if (checkedMeals[idx]) {
        const calVal =
          typeof meal.calories === "string"
            ? parseInt(meal.calories.replace(/\D/g, "")) || 0
            : meal.calories || 0;
        return total + calVal;
      }
      return total;
    }, 0);
  };

  const consumedCalories = calculateConsumedCalories();
  const totalCalories = dashboardData?.calories?.total || 0;
  const caloriePercentage =
    totalCalories > 0
      ? Math.round((consumedCalories / totalCalories) * 100)
      : 0;

  // Workout Kalorisi
  const calculateBurnedCalories = () => {
    if (!dashboardData?.workout?.exercises) return 0;

    const dayEnMap = {
      Pazartesi: "Monday",
      Salı: "Tuesday",
      Çarşamba: "Wednesday",
      Perşembe: "Thursday",
      Cuma: "Friday",
      Cumartesi: "Saturday",
      Pazar: "Sunday",
    };

    const activeDayEn = dayEnMap[selectedDay];

    return dashboardData.workout.exercises.reduce((total, exercise) => {
      const uniqueId = `${activeDayEn}-${exercise.exercise_name}`;
      const isCompleted = completedExercises.includes(uniqueId);
      const kcal = parseInt(exercise.kcal || 0);

      if (isCompleted) return total + kcal;
      return total;
    }, 0);
  };

  const totalWorkoutCalories = dashboardData?.workout?.exercises
    ? dashboardData.workout.exercises.reduce(
        (sum, ex) => sum + parseInt(ex.kcal || 0),
        0
      )
    : 0;
  const burnedCalories = calculateBurnedCalories();
  const workoutPercentage =
    totalWorkoutCalories > 0
      ? Math.round((burnedCalories / totalWorkoutCalories) * 100)
      : 0;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="px-8 flex flex-1 justify-center py-10">
            <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 gap-8">
              {/* PageHeading */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-4xl font-black leading-tight tracking-[-0.033em]">
                    {getGreeting()}, {userName}!
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                    {getTodayFormatted()}
                  </p>
                </div>
              </div>

              {/* Gün Seçici */}
              <div className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-semibold mb-3">Gün Seç</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {daysList.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg cursor-pointer font-medium text-sm whitespace-nowrap transition-colors ${
                        selectedDay === day
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SOL KOLON */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* BESLENME PLANI */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Beslenme Planı - {selectedDay}
                    </h2>

                    <div
                      className="flex flex-col divide-y divide-border-light dark:divide-border-dark"
                      style={{ "--checkbox-tick-svg": checkboxTickSvg }}
                    >
                      {dashboardData?.meals &&
                      dashboardData.meals.length > 0 ? (
                        dashboardData.meals.map((meal, idx) => {
                          const calVal =
                            typeof meal.calories === "string"
                              ? parseInt(meal.calories.replace(/\D/g, "")) || 0
                              : meal.calories || 0;

                          return (
                            <label
                              key={idx}
                              className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group"
                            >
                              <input
                                checked={checkedMeals[idx] || false}
                                onChange={() => handleMealCheck(idx, calVal)}
                                className="h-6 w-6 rounded cursor-pointer border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 transition-all duration-200"
                                type="checkbox"
                              />
                              <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 bg-primary/10 rounded-lg text-primary">
                                  <span className="material-symbols-outlined">
                                    restaurant
                                  </span>
                                </div>
                                <div>
                                  <p className="text-base font-medium leading-normal group-hover:text-primary transition-colors">
                                    {meal.name || meal.meal_name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {calVal} kcal
                                  </p>
                                </div>
                              </div>
                            </label>
                          );
                        })
                      ) : (
                        <p className="text-center py-8 text-gray-500">
                          Bugün için plan bulunamadı.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* EGZERSİZ PLANI */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Egzersiz Planı - {selectedDay}
                    </h2>
                    {dashboardData?.workout?.exercises &&
                    dashboardData.workout.exercises.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-lg font-bold">
                            {dashboardData.workout.workoutName || "Antrenman"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {dashboardData.workout.exercises.length} hareket
                          </p>
                        </div>
                        {dashboardData.workout.exercises.map(
                          (exercise, idx) => {
                            const dayEnMap = {
                              Pazartesi: "Monday",
                              Salı: "Tuesday",
                              Çarşamba: "Wednesday",
                              Perşembe: "Thursday",
                              Cuma: "Friday",
                              Cumartesi: "Saturday",
                              Pazar: "Sunday",
                            };
                            const activeDayEn = dayEnMap[selectedDay];
                            const uniqueId = `${activeDayEn}-${exercise.exercise_name}`;
                            const isCompleted =
                              completedExercises.includes(uniqueId);

                            return (
                              <div
                                key={idx}
                                className={`flex items-center justify-between gap-3 bg-gray-50 dark:bg-black/20 p-3 rounded-lg ${
                                  isCompleted ? "opacity-60" : ""
                                }`}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <div
                                    className={`flex items-center justify-center size-10 rounded-lg ${
                                      isCompleted
                                        ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                                        : "bg-orange-500/10 text-orange-500"
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-2xl">
                                      {isCompleted
                                        ? "check_circle"
                                        : "fitness_center"}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-semibold text-sm">
                                      {exercise.exercise_name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {exercise.sets_reps || "3x12"} •{" "}
                                      {exercise.kcal || 0} kcal
                                    </p>
                                  </div>
                                </div>
                                {isCompleted && (
                                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                    Tamamlandı
                                  </span>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p className="text-lg">Bugün için antrenman yok</p>
                      </div>
                    )}
                  </div>

                  {/* SU TÜKETİMİ */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Su Tüketimi
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          {waterGlasses} / {waterGoal} bardak
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {Math.round((waterGlasses / waterGoal) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              (waterGlasses / waterGoal) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        {[...Array(waterGoal)].map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setWaterGlasses(idx + 1)}
                            className={`flex flex-col cursor-pointer items-center justify-center p-3 rounded-lg transition-all ${
                              idx < waterGlasses
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200"
                            }`}
                          >
                            <div className="text-2xl">
                              {idx < waterGlasses ? "💧" : "🥤"}
                            </div>
                            <span className="text-xs mt-1">{idx + 1}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setWaterGlasses(0)}
                        className="mt-2 px-4 py-2 cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Sıfırla
                      </button>
                    </div>
                  </div>
                </div>

                {/* SAĞ KOLON: İLERLEME */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark sticky top-8">
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-6">
                      Bugünkü İlerlemeniz
                    </h3>
                    <div className="flex flex-col gap-8">
                      {/* Kalori */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" viewBox="0 0 36 36">
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-primary"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset={100 - caloriePercentage}
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-primary">
                              {Math.round(caloriePercentage)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Kalori</p>
                          <p className="text-sm text-gray-500">
                            {consumedCalories} / {totalCalories} kcal
                          </p>
                        </div>
                      </div>
                      {/* Egzersiz */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" viewBox="0 0 36 36">
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-orange-500"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset={100 - workoutPercentage}
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-orange-500">
                              {workoutPercentage}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Egzersiz</p>
                          <p className="text-sm text-gray-500">
                            {burnedCalories} / {totalWorkoutCalories} kcal
                            yakıldı
                          </p>
                        </div>
                      </div>
                      {/* Su */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg className="size-full" viewBox="0 0 36 36">
                            <circle
                              className="stroke-current text-gray-100 dark:text-white/10"
                              cx="18"
                              cy="18"
                              fill="none"
                              r="16"
                              strokeWidth="3"
                            ></circle>
                            <g className="origin-center -rotate-90 transform">
                              <circle
                                className="stroke-current text-blue-500"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset={
                                  100 - (waterGlasses / waterGoal) * 100
                                }
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-blue-500">
                              {Math.round((waterGlasses / waterGoal) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Su</p>
                          <p className="text-sm text-gray-500">
                            {waterGlasses} / {waterGoal} bardak
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
