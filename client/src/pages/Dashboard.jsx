import React, { useState, useEffect } from "react";
import axios from "axios";

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
  
  const waterGoal = 8; // 8 bardak hedef
  
  const daysList = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  
  // Bugünün tarihini formatla
  const getTodayFormatted = () => {
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    const today = new Date();
    const dayName = days[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };
  
  // Selamlama mesajı (sabah/öğleden sonra/akşam)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };
  
  // Checkbox tick ikonu için SVG data URI (JSX stili içinde kullanım için)
  const checkboxTickSvg = `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:5002/profile/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("📥 Profile Response:", response.data);
        
        // Kullanıcı adını ayarla
        if (response.data.user && response.data.user.username) {
          setUserName(response.data.user.username);
        }
        
        // Nutrition plan verisini parse et
        let planData = [];
        if (response.data.nutritionPlan && response.data.nutritionPlan.planData) {
          planData = typeof response.data.nutritionPlan.planData === "string"
            ? JSON.parse(response.data.nutritionPlan.planData)
            : response.data.nutritionPlan.planData;
        }
        setFullPlanData(planData);
        
        // Workout plan verisini parse et
        let workoutData = null;
        if (response.data.workoutPlan && response.data.workoutPlan.planData) {
          workoutData = typeof response.data.workoutPlan.planData === "string"
            ? JSON.parse(response.data.workoutPlan.planData)
            : response.data.workoutPlan.planData;
        }
        setWorkoutPlanData(workoutData);
        
        // LocalStorage'dan tamamlanan egzersizleri al
        try {
          const saved = localStorage.getItem("myWorkoutProgress");
          const completed = saved ? JSON.parse(saved) : [];
          setCompletedExercises(completed);
          console.log("✅ Tamamlanan egzersizler:", completed);
        } catch (e) {
          setCompletedExercises([]);
        }
        
        console.log("🍽️ Full Plan Data:", planData);
        console.log("💪 Workout Plan Data:", workoutData);
        
      } catch (error) {
        console.error("Dashboard veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Seçili güne göre öğünleri filtrele
  useEffect(() => {
    if (!fullPlanData || fullPlanData.length === 0) {
      setDashboardData({
        meals: [],
        workout: null,
        calories: { total: 0, consumed: 0, remaining: 0 }
      });
      return;
    }
    
    const dayIndex = daysList.indexOf(selectedDay);
    const genericDayName = `${dayIndex + 1}. Gün`;
    
    const todayMeals = fullPlanData.filter((item) => {
      const cleanGun = item.gun ? item.gun.replace(/\s/g, "") : "";
      const cleanGeneric = genericDayName.replace(/\s/g, "");
      return (
        item.gun === selectedDay ||
        cleanGun === cleanGeneric ||
        item.gun?.includes(selectedDay)
      );
    });
    
    // Bugünün workout'unu bul
    let todayWorkout = null;
    if (workoutPlanData && Array.isArray(workoutPlanData)) {
      todayWorkout = workoutPlanData.find(item => {
        if (!item.day) return false;
        // "Pazar" ise "Pazartesi" ile karışmaması için özel kontrol
        if (selectedDay === "Pazar") {
          return item.day.includes("Pazar") && !item.day.includes("Pazartesi");
        }
        return item.day.includes(selectedDay);
      }) || null;
    }
    
    console.log("🔍 Seçili gün:", selectedDay);
    console.log("💪 Bugünün workout'u:", todayWorkout);
    
    // Toplam kalori hesapla
    const totalCalories = todayMeals.reduce((total, meal) => {
      const calVal = typeof meal.calories === "string" 
        ? parseInt(meal.calories.replace(/\D/g, "")) || 0
        : meal.calories || 0;
      return total + calVal;
    }, 0);
    
    setDashboardData({
      meals: todayMeals,
      workout: todayWorkout,
      calories: { total: totalCalories, consumed: 0, remaining: totalCalories }
    });
    
    // İlk yüklemede tüm öğünleri unchecked yap
    const initialChecked = {};
    todayMeals.forEach((_, idx) => {
      initialChecked[idx] = false;
    });
    setCheckedMeals(initialChecked);
  }, [fullPlanData, selectedDay, workoutPlanData, completedExercises]);

  const handleMealCheck = (index, calories) => {
    setCheckedMeals(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const calculateConsumedCalories = () => {
    if (!dashboardData?.meals) return 0;
    return dashboardData.meals.reduce((total, meal, idx) => {
      if (checkedMeals[idx]) {
        const calVal = typeof meal.calories === "string" 
          ? parseInt(meal.calories.replace(/\D/g, "")) || 0
          : meal.calories || 0;
        return total + calVal;
      }
      return total;
    }, 0);
  };

  const consumedCalories = calculateConsumedCalories();
  const totalCalories = dashboardData?.calories?.total || 0;
  const caloriePercentage = totalCalories > 0 ? Math.round((consumedCalories / totalCalories) * 100) : 0;

  // Workout kalori hesaplama - tamamlanan hareketlerin kalorilerini topla
  const calculateBurnedCalories = () => {
    if (!dashboardData?.workout?.exercises) {
      console.log("⚠️ Workout exercises yok");
      return 0;
    }
    
    const dayEnMap = {
      "Pazartesi": "Monday",
      "Salı": "Tuesday", 
      "Çarşamba": "Wednesday",
      "Perşembe": "Thursday",
      "Cuma": "Friday",
      "Cumartesi": "Saturday",
      "Pazar": "Sunday"
    };
    
    const activeDayEn = dayEnMap[selectedDay];
    console.log("📅 Aktif gün (EN):", activeDayEn);
    console.log("🏋️ Exercises:", dashboardData.workout.exercises);
    
    return dashboardData.workout.exercises.reduce((total, exercise) => {
      const uniqueId = `${activeDayEn}-${exercise.exercise_name}`;
      const isCompleted = completedExercises.includes(uniqueId);
      const kcal = parseInt(exercise.kcal || 0);
      
      console.log(`  - ${exercise.exercise_name}: ${uniqueId}, completed: ${isCompleted}, kcal: ${kcal}`);
      
      if (isCompleted) {
        return total + kcal;
      }
      return total;
    }, 0);
  };

  const totalWorkoutCalories = dashboardData?.workout?.exercises 
    ? dashboardData.workout.exercises.reduce((sum, ex) => sum + parseInt(ex.kcal || 0), 0)
    : 0;
  const burnedCalories = calculateBurnedCalories();
  const workoutPercentage = totalWorkoutCalories > 0 ? Math.round((burnedCalories / totalWorkoutCalories) * 100) : 0;

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

              {/* Gün Seçici - Hem Nutrition hem Workout için */}
              <div className="bg-white dark:bg-white/5 rounded-xl p-4 shadow-sm border border-border-light dark:border-border-dark">
                <h3 className="text-lg font-semibold mb-3">Gün Seç</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {daysList.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
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

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Plans */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* Today's Nutrition Plan */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Beslenme Planı - {selectedDay}
                    </h2>
                    
                    <div
                      className="flex flex-col divide-y divide-border-light dark:divide-border-dark"
                      style={{ "--checkbox-tick-svg": checkboxTickSvg }}
                    >
                      {dashboardData?.meals && dashboardData.meals.length > 0 ? (
                        dashboardData.meals.map((meal, idx) => {
                          const calVal = typeof meal.calories === "string" 
                            ? parseInt(meal.calories.replace(/\D/g, "")) || 0
                            : meal.calories || 0;
                          
                          return (
                            <label key={idx} className="flex gap-x-4 py-4 items-center flex-row-reverse justify-between cursor-pointer group">
                              <input
                                checked={checkedMeals[idx] || false}
                                onChange={() => handleMealCheck(idx, calVal)}
                                className="h-6 w-6 rounded border-border-light dark:border-border-dark border-2 bg-transparent text-primary checked:bg-primary checked:border-primary checked:bg-[image:var(--checkbox-tick-svg)] focus:ring-0 focus:ring-offset-0 focus:border-border-light dark:focus:border-border-dark focus:outline-none transition-all duration-200"
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
                        <p className="text-center py-8 text-gray-500">Bugün için plan bulunamadı</p>
                      )}
                    </div>
                  </div>

                  {/* Today's Workout */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Egzersiz Planı - {selectedDay}
                    </h2>
                    {dashboardData?.workout?.exercises && dashboardData.workout.exercises.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-lg font-bold">{dashboardData.workout.workoutName || "Workout Plan"}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{dashboardData.workout.exercises.length} exercises</p>
                        </div>
                        {dashboardData.workout.exercises.map((exercise, idx) => {
                          const dayEnMap = {
                            "Pazartesi": "Monday",
                            "Salı": "Tuesday",
                            "Çarşamba": "Wednesday",
                            "Perşembe": "Thursday",
                            "Cuma": "Friday",
                            "Cumartesi": "Saturday",
                            "Pazar": "Sunday"
                          };
                          const activeDayEn = dayEnMap[selectedDay];
                          const uniqueId = `${activeDayEn}-${exercise.exercise_name}`;
                          const isCompleted = completedExercises.includes(uniqueId);
                          
                          return (
                            <div key={idx} className={`flex items-center justify-between gap-3 bg-gray-50 dark:bg-black/20 p-3 rounded-lg ${isCompleted ? 'opacity-60' : ''}`}>
                              <div className="flex items-center gap-3 flex-1">
                                <div className={`flex items-center justify-center size-10 rounded-lg ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-accent-orange/10 text-accent-orange'}`}>
                                  {isCompleted ? (
                                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                                  ) : (
                                    <span className="material-symbols-outlined text-2xl">fitness_center</span>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-sm">{exercise.exercise_name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {exercise.sets_reps || exercise.sets} • {exercise.duration || 0} min • {exercise.kcal || 0} kcal
                                  </p>
                                </div>
                              </div>
                              {isCompleted && (
                                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                  Completed
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p className="text-lg">Planlanmış bir egzersiz yok -  {selectedDay}</p>
                        <p className="text-sm mt-2">Egzersiz bölümünde bir egzersiz planı oluşturun.</p>
                      </div>
                    )}
                  </div>

                  {/* Water Intake */}
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-4">
                      Su Tüketimi
                    </h2>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">{waterGlasses} / {waterGoal} bardak</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((waterGlasses / waterGoal) * 100)}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((waterGlasses / waterGoal) * 100, 100)}%` }}
                        ></div>
                      </div>
                      
                      {/* Water Glasses Grid */}
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        {[...Array(waterGoal)].map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setWaterGlasses(idx + 1)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                              idx < waterGlasses
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                          >
                            <div className="text-2xl">
                              {idx < waterGlasses ? '💧' : '🥤'}
                            </div>
                            <span className="text-xs mt-1">{idx + 1}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Reset Button */}
                      <button
                        onClick={() => setWaterGlasses(0)}
                        className="mt-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        Sıfırla
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Progress */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                  <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark">
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] pb-6">
                      Bugünkü ilerlemeniz
                    </h3>
                    <div className="flex flex-col gap-8">
                      {/* Calories Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {consumedCalories} / {totalCalories} kcal
                          </p>
                        </div>
                      </div>
                      {/* Workout Calories Burned */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                                className="stroke-current text-accent-orange"
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
                            <span className="text-lg font-bold text-accent-orange">
                              {workoutPercentage}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Egzersiz</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {burnedCalories} / {totalWorkoutCalories} kcal yakıldı
                          </p>
                        </div>
                      </div>
                      {/* Water Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                                strokeDashoffset={100 - ((waterGlasses / waterGoal) * 100)}
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
                          <p className="font-bold text-lg">Su Tüketimi</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {waterGlasses} / {waterGoal} bardak
                          </p>
                        </div>
                      </div>
                      {/* Steps Progress */}
                      <div className="flex items-center gap-4">
                        <div className="relative size-20">
                          <svg
                            className="size-full"
                            height="36"
                            viewBox="0 0 36 36"
                            width="36"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                                className="stroke-current text-accent-yellow"
                                cx="18"
                                cy="18"
                                fill="none"
                                r="16"
                                strokeDasharray="100"
                                strokeDashoffset="55"
                                strokeWidth="3"
                              ></circle>
                            </g>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <span className="text-lg font-bold text-accent-yellow">
                              45%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Adım</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            4,500 / 10,000
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

        {/* FAB */}
        
      </div>
    </div>
  );
}
