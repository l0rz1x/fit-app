import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

const NutritionScreen = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // --- GÜN LİSTESİ ---
  const daysMap = [
    { en: "Monday", tr: "Pazartesi" },
    { en: "Tuesday", tr: "Salı" },
    { en: "Wednesday", tr: "Çarşamba" },
    { en: "Thursday", tr: "Perşembe" },
    { en: "Friday", tr: "Cuma" },
    { en: "Saturday", tr: "Cumartesi" },
    { en: "Sunday", tr: "Pazar" },
  ];

  // --- AKILLI RESİM ATAYICI (Fallback Sistemi) ---
  // Eğer veritabanından resim gelmezse, yemek ismine bakıp buradan seçer.
  const getMealImage = (mealData) => {
    // 1. Önce veritabanından/AI'dan resim gelmiş mi bak?
    if (mealData.image && mealData.image.startsWith("http")) {
      return mealData.image;
    }

    // 2. Gelmemişse ismine göre biz atayalım
    const lowerName = (mealData.meal_name || "").toLowerCase();

    if (
      lowerName.includes("kahvaltı") ||
      lowerName.includes("yumurta") ||
      lowerName.includes("omlet") ||
      lowerName.includes("yulaf") ||
      lowerName.includes("pancake")
    )
      return "https://images.unsplash.com/photo-1533089862017-5614a957425c?q=80&w=1974&auto=format&fit=crop";

    if (
      lowerName.includes("salata") ||
      lowerName.includes("bowl") ||
      lowerName.includes("avokado")
    )
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop";

    if (
      lowerName.includes("tavuk") ||
      lowerName.includes("chicken") ||
      lowerName.includes("hindi")
    )
      return "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1969&auto=format&fit=crop";

    if (
      lowerName.includes("balık") ||
      lowerName.includes("somon") ||
      lowerName.includes("ton")
    )
      return "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop";

    if (
      lowerName.includes("et") ||
      lowerName.includes("bonfile") ||
      lowerName.includes("kıyma") ||
      lowerName.includes("köfte") ||
      lowerName.includes("kebap")
    )
      return "https://images.unsplash.com/photo-1603048297172-c92544798d5e?q=80&w=2070&auto=format&fit=crop";

    if (
      lowerName.includes("makarna") ||
      lowerName.includes("pasta") ||
      lowerName.includes("spagetti")
    )
      return "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop";

    if (
      lowerName.includes("pilav") ||
      lowerName.includes("pirinç") ||
      lowerName.includes("bulgur")
    )
      return "https://images.unsplash.com/photo-1536304993881-ffc0212a04f9?q=80&w=1974&auto=format&fit=crop";

    if (
      lowerName.includes("yoğurt") ||
      lowerName.includes("meyve") ||
      lowerName.includes("ara öğün") ||
      lowerName.includes("kuruyemiş") ||
      lowerName.includes("smoothie")
    )
      return "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop";

    // Hiçbiri tutmazsa varsayılan güzel bir yemek resmi
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
  };

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        let planData = [];

        if (data.nutritionPlan && data.nutritionPlan.planData) {
          const rawData = data.nutritionPlan.planData;

          // Güvenli JSON Parse İşlemi
          if (typeof rawData === "string") {
            try {
              planData = JSON.parse(rawData);
            } catch (e) {
              console.error("JSON Hatası:", e);
              planData = [];
            }
          } else if (typeof rawData === "object") {
            planData = rawData;
          }

          // Yapı Kontrolü (Nested mi Düz mü?)
          if (
            !Array.isArray(planData) &&
            planData.diet_plan &&
            Array.isArray(planData.diet_plan)
          ) {
            planData = planData.diet_plan;
          }

          // Son çare: Array değilse array içine al
          if (!Array.isArray(planData)) {
            if (planData && typeof planData === "object") {
              planData = [planData];
            } else {
              planData = [];
            }
          }
        }

        setDietPlan(planData);
      } catch (err) {
        console.error("API Hatası:", err);
        setDietPlan([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- GÜN FİLTRELEME (Pazar/Pazartesi Çakışması Fixli) ---
  const currentDayData = useMemo(() => {
    if (!dietPlan || !Array.isArray(dietPlan) || dietPlan.length === 0)
      return null;

    // Aktif gün
    const dayIndex = daysMap.findIndex((d) => d.en === activeDay);
    const dayObj = daysMap[dayIndex];
    const trName = dayObj ? dayObj.tr : "Pazartesi";

    // Olası İsimler
    const genericDayName = `${dayIndex + 1}. Gün`;

    let foundMeals = [];

    // 1. Nested Yapı Kontrolü (recipes_cards)
    const dayObject = dietPlan.find((item) => {
      const dName = (item.day || item.gun || "").toString().trim();

      // Pazar İstisnası
      if (trName === "Pazar") {
        return (
          dName === "Pazar" ||
          (dName.includes("Pazar") && !dName.includes("Pazartesi")) ||
          dName === genericDayName
        );
      }
      return (
        dName === trName || dName.includes(trName) || dName === genericDayName
      );
    });

    if (dayObject && Array.isArray(dayObject.recipes_cards)) {
      foundMeals = dayObject.recipes_cards;
    }
    // 2. Düz Liste Kontrolü
    else {
      foundMeals = dietPlan.filter((item) => {
        const dName = (item.day || item.gun || "").toString().trim();

        if (trName === "Pazar") {
          return (
            dName === "Pazar" ||
            (dName.includes("Pazar") && !dName.includes("Pazartesi")) ||
            dName === genericDayName
          );
        }
        return (
          dName === trName || dName.includes(trName) || dName === genericDayName
        );
      });
    }

    if (!foundMeals || foundMeals.length === 0) return null;

    // Veriyi Standartlaştır
    const formattedMeals = foundMeals.map((m) => {
      let calVal = 0;
      if (m.calories) {
        if (typeof m.calories === "string") {
          calVal = parseInt(m.calories.replace(/\D/g, "")) || 0;
        } else {
          calVal = m.calories;
        }
      }

      // Malzeme listesini bul
      let itemsList = [];
      if (Array.isArray(m.items)) itemsList = m.items;
      else if (Array.isArray(m.ingredients)) itemsList = m.ingredients;
      else if (m.recipe) itemsList = m.recipe.split(",").map((i) => i.trim());
      else itemsList = [`${m.category || "Sağlıklı Öğün"}`];

      return {
        meal_name: m.name || m.meal_name || "İsimsiz Öğün",
        calories: calVal,
        protein: m.protein || 0,
        carbs: m.carb || m.carbs || 0,
        fat: m.fat || 0,
        items: itemsList,
        instructions: m.instructions || "Tarif adımı bulunmuyor.",
        prep_time: m.prep_time,
        image: m.image, // Eğer backend'den gelirse buraya alıyoruz
      };
    });

    return { meals: formattedMeals };
  }, [dietPlan, activeDay]);

  // İlk yemeği seç
  useEffect(() => {
    if (currentDayData?.meals?.length > 0) {
      setSelectedMeal(currentDayData.meals[0]);
    } else {
      setSelectedMeal(null);
    }
  }, [currentDayData]);

  // --- RENDER ---
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // Plan Yoksa
  if (!dietPlan || !Array.isArray(dietPlan) || dietPlan.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background-light dark:bg-background-dark gap-4">
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
          Henüz bir beslenme planın yok.
        </h2>
        <button
          onClick={() => navigate("/nutrition-chat")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition shadow-lg shadow-primary/30"
        >
          Plan Oluştur
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          <div className="flex flex-col md:flex-row h-full">
            {/* --- SIDEBAR --- */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-solid border-border-light dark:border-border-dark p-4 md:p-6 bg-background-light dark:bg-background-dark">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                    Haftalık Plan
                  </h1>
                  <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                    Bir gün seçin
                  </p>
                </div>

                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {daysMap.map((day) => {
                    const isActive = activeDay === day.en;
                    return (
                      <div
                        key={day.en}
                        onClick={() => setActiveDay(day.en)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer flex-shrink-0 transition-colors ${
                          isActive
                            ? "bg-primary/20"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-xl ${
                            isActive
                              ? "text-text-light dark:text-text-dark"
                              : "text-subtle-light dark:text-subtle-dark"
                          }`}
                          style={
                            isActive
                              ? { fontVariationSettings: "'FILL' 1" }
                              : {}
                          }
                        >
                          calendar_today
                        </span>
                        <p
                          className={`text-sm font-medium leading-normal ${
                            isActive
                              ? "text-text-light dark:text-text-dark"
                              : "text-subtle-light dark:text-subtle-dark"
                          }`}
                        >
                          {day.tr}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* --- İÇERİK --- */}
            <div className="flex-1 grid grid-cols-1 xl:grid-cols-3">
              {/* LİSTE */}
              <section className="xl:col-span-1 p-4 md:p-6 border-b xl:border-b-0 xl:border-r border-solid border-border-light dark:border-border-dark overflow-y-auto max-h-[calc(100vh-80px)]">
                <h2 className="text-text-light dark:text-text-dark text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                  {daysMap.find((d) => d.en === activeDay)?.tr} Öğünleri
                </h2>

                {!currentDayData ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center h-64 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl">
                    <span className="material-symbols-outlined text-4xl text-subtle-light mb-2">
                      no_meals
                    </span>
                    <p className="text-text-light dark:text-text-dark font-medium">
                      Bu gün için plan bulunamadı.
                    </p>
                    <p className="text-xs text-subtle-light mt-1">
                      Sadece planlanan günler doludur.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {currentDayData.meals?.map((meal, idx) => {
                      const isActive =
                        selectedMeal &&
                        selectedMeal.meal_name === meal.meal_name;
                      // BURASI KRİTİK: Resmi buradan çekiyoruz
                      const mealImg = getMealImage(meal);

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedMeal(meal)}
                          className={`flex flex-col gap-3 pb-3 p-3 rounded-xl transition-all cursor-pointer ${
                            isActive
                              ? "bg-primary/20 border-2 border-primary"
                              : "bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/50"
                          }`}
                        >
                          <div
                            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                            style={{ backgroundImage: `url("${mealImg}")` }}
                          ></div>
                          <div>
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">
                              {meal.meal_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-subtle-light dark:text-subtle-dark text-sm font-normal">
                                {meal.calories} kcal
                              </span>
                              {meal.prep_time && (
                                <span className="text-xs bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400">
                                  {meal.prep_time} dk
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* DETAY */}
              <section className="xl:col-span-2 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {selectedMeal ? (
                  <div className="flex flex-col gap-6">
                    {/* Hero Image */}
                    <div
                      className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-64 md:min-h-80 shadow-lg"
                      style={{
                        // BURASI KRİTİK: Seçili yemeğin resmini de aynı fonksiyondan çekiyoruz
                        backgroundImage: `url("${getMealImage(selectedMeal)}")`,
                      }}
                    ></div>

                    {/* Stats */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                          {selectedMeal.meal_name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center justify-center gap-2 px-4 h-10 rounded-lg bg-primary/20 text-text-light dark:text-text-dark text-sm font-medium hover:bg-primary/30 transition-colors">
                            <span className="material-symbols-outlined text-base">
                              shopping_cart
                            </span>
                            <span className="hidden sm:inline">
                              Listeye Ekle
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-subtle-light dark:text-subtle-dark flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg text-orange-500">
                            local_fire_department
                          </span>
                          <span className="text-sm font-bold">
                            {selectedMeal.calories} kcal
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg text-blue-500">
                            egg_alt
                          </span>
                          <span className="text-sm">
                            Prot: {selectedMeal.protein}g
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg text-green-500">
                            bakery_dining
                          </span>
                          <span className="text-sm">
                            Karb: {selectedMeal.carbs}g
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg text-yellow-500">
                            opacity
                          </span>
                          <span className="text-sm">
                            Yağ: {selectedMeal.fat}g
                          </span>
                        </div>
                        {selectedMeal.prep_time && (
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-lg text-gray-400">
                              timer
                            </span>
                            <span className="text-sm">
                              {selectedMeal.prep_time} dk
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-col gap-4">
                      <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
                        {["Ingredients", "Instructions"].map((tab) => {
                          const tabTR =
                            tab === "Ingredients" ? "İçindekiler" : "Tarif";
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                                activeTab === tab
                                  ? "text-primary border-primary"
                                  : "text-subtle-light dark:text-subtle-dark border-transparent hover:text-text-light dark:hover:text-text-dark"
                              }`}
                            >
                              {tabTR}
                            </button>
                          );
                        })}
                      </div>

                      {/* Ingredients Tab */}
                      {activeTab === "Ingredients" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm text-text-light dark:text-text-dark/90 animate-fade-in">
                          {Array.isArray(selectedMeal.items) ? (
                            selectedMeal.items.map((ing, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 group cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id={`ing-${idx}`}
                                  className="h-4 w-4 rounded border-border-light text-primary focus:ring-primary/50 cursor-pointer"
                                />
                                <label
                                  htmlFor={`ing-${idx}`}
                                  className="cursor-pointer group-hover:text-primary transition-colors"
                                >
                                  {ing}
                                </label>
                              </div>
                            ))
                          ) : (
                            <p>
                              {selectedMeal.items ||
                                "Malzeme bilgisi girilmemiş."}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Instructions Tab */}
                      {activeTab === "Instructions" && (
                        <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in leading-relaxed">
                          <p className="p-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg">
                            <span className="material-symbols-outlined align-middle mr-2 text-primary">
                              info
                            </span>
                            {selectedMeal.instructions ||
                              "Bu yemek için özel bir tarif adımı bulunmuyor."}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-subtle-light">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">
                      restaurant_menu
                    </span>
                    <p>
                      {currentDayData
                        ? "Detayları görmek için soldan bir yemek seç."
                        : "Bu gün için görüntülenecek öğün yok."}
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NutritionScreen;