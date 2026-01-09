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

  // --- YARDIMCI: Resim Atayıcı ---
  const getMealImage = (mealName) => {
    const lowerName = mealName?.toLowerCase() || "";
    if (
      lowerName.includes("kahvaltı") ||
      lowerName.includes("yumurta") ||
      lowerName.includes("omlet") ||
      lowerName.includes("yulaf")
    )
      return "https://images.unsplash.com/photo-1533089862017-5614a957425c?q=80&w=1974&auto=format&fit=crop";
    if (lowerName.includes("salata") || lowerName.includes("salad"))
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop";
    if (lowerName.includes("tavuk") || lowerName.includes("chicken"))
      return "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1969&auto=format&fit=crop";
    if (lowerName.includes("balık") || lowerName.includes("somon"))
      return "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop";
    if (
      lowerName.includes("ara öğün") ||
      lowerName.includes("snack") ||
      lowerName.includes("yoğurt")
    )
      return "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop";
    if (lowerName.includes("makarna") || lowerName.includes("pasta"))
      return "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070&auto=format&fit=crop";

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
          planData =
            typeof data.nutritionPlan.planData === "string"
              ? JSON.parse(data.nutritionPlan.planData)
              : data.nutritionPlan.planData;
        }
        setDietPlan(planData);
      } catch (err) {
        console.error("Hata:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- SEÇİLİ GÜNÜN VERİSİNİ BUL (KRİTİK DÜZELTME BURADA) ---
  // --- SEÇİLİ GÜNÜN VERİSİNİ BUL (GÜNCELLENDİ) ---
  const currentDayData = useMemo(() => {
    if (!dietPlan || !Array.isArray(dietPlan) || dietPlan.length === 0)
      return null;

    // Aktif günün indeksini bul (Pazartesi=0, Salı=1...)
    const dayIndex = daysMap.findIndex((d) => d.en === activeDay);
    const dayObj = daysMap[dayIndex];
    const trName = dayObj ? dayObj.tr : ""; // "Pazartesi"

    // Verideki "1. Gün", "2. Gün" formatını oluştur
    const genericDayName = `${dayIndex + 1}. Gün`;

    // Hem Türkçe isme (Pazartesi) hem de Sayısal isme (1. Gün) göre filtrele
    const dayMealsRaw = dietPlan.filter((item) => {
      // Gelen veri bazen "1. Gün" bazen "1.Gün" olabilir, boşlukları temizleyerek kontrol edelim
      const cleanGun = item.gun ? item.gun.replace(/\s/g, "") : "";
      const cleanGeneric = genericDayName.replace(/\s/g, "");

      return (
        item.gun === trName ||
        cleanGun === cleanGeneric ||
        item.gun.includes(trName)
      );
    });

    if (dayMealsRaw.length === 0) return null;

    // Formatlama (Aynen devam)
    const formattedMeals = dayMealsRaw.map((m) => {
      let calVal = 0;
      // Kalori "Kcal 350" gibi gelmiş, sadece sayıyı alalım
      if (typeof m.calories === "string") {
        calVal = parseInt(m.calories.replace(/\D/g, "")) || 0;
      } else {
        calVal = m.calories || 0;
      }

      return {
        meal_name: m.name,
        calories: calVal,
        protein: m.protein || 0,
        carbs: m.carbs || 0,
        fat: m.fat || 0,
        // Malzeme listesi yoksa kategori adını yaz
        items: m.items || m.ingredients || [`${m.category || "Öğün"}`],
      };
    });

    return { meals: formattedMeals };
  }, [dietPlan, activeDay]);

  // Gün değişince listenin ilk yemeğini otomatik seç
  useEffect(() => {
    if (currentDayData?.meals?.length > 0) {
      setSelectedMeal(currentDayData.meals[0]);
    } else {
      setSelectedMeal(null);
    }
  }, [currentDayData]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // Eğer plan yoksa
  if (!dietPlan || dietPlan.length === 0) {
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
            {/* --- SIDEBAR (Günler) --- */}
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

            {/* --- ANA İÇERİK --- */}
            <div className="flex-1 grid grid-cols-1 xl:grid-cols-3">
              {/* SOL KOLON: Yemek Listesi */}
              <section className="xl:col-span-1 p-4 md:p-6 border-b xl:border-b-0 xl:border-r border-solid border-border-light dark:border-border-dark overflow-y-auto max-h-[calc(100vh-80px)]">
                <h2 className="text-text-light dark:text-text-dark text-xl md:text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                  {daysMap.find((d) => d.en === activeDay)?.tr} Öğünleri
                </h2>

                {!currentDayData ? (
                  <div className="p-4 text-center text-subtle-light">
                    Bugün için plan bulunamadı.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                    {currentDayData.meals.map((meal, idx) => {
                      const isActive =
                        selectedMeal &&
                        selectedMeal.meal_name === meal.meal_name;
                      const mealImg = getMealImage(meal.meal_name);

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
                            <p className="text-subtle-light dark:text-subtle-dark text-sm font-normal leading-normal">
                              {meal.calories} kcal
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* SAĞ KOLON: Yemek Detayı */}
              <section className="xl:col-span-2 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {selectedMeal ? (
                  <div className="flex flex-col gap-6">
                    {/* Hero Image */}
                    <div
                      className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-64 md:min-h-80 shadow-lg"
                      style={{
                        backgroundImage: `url("${getMealImage(
                          selectedMeal.meal_name
                        )}")`,
                      }}
                    ></div>

                    {/* Title & Stats */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                          {selectedMeal.meal_name}
                        </h2>
                        {/* Butonlar */}
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

                      <div className="flex items-center gap-4 text-subtle-light dark:text-subtle-dark">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg">
                            local_fire_department
                          </span>
                          <span className="text-sm">
                            {selectedMeal.calories} kcal
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg">
                            egg_alt
                          </span>
                          <span className="text-sm">
                            Prot: {selectedMeal.protein}g
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg">
                            bakery_dining
                          </span>
                          <span className="text-sm">
                            Karb: {selectedMeal.carbs}g
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-lg">
                            opacity
                          </span>
                          <span className="text-sm">
                            Yağ: {selectedMeal.fat}g
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-col gap-4">
                      <div className="flex border-b border-border-light dark:border-border-dark overflow-x-auto">
                        {["Ingredients", "Instructions", "Nutrition"].map(
                          (tab) => {
                            const tabTR =
                              tab === "Ingredients"
                                ? "İçindekiler"
                                : tab === "Instructions"
                                ? "Tarif"
                                : "Besin Değeri";
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
                          }
                        )}
                      </div>

                      {/* Ingredients Tab Content */}
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
                            <p>{selectedMeal.items}</p>
                          )}
                        </div>
                      )}

                      {/* Instructions Tab Content */}
                      {activeTab === "Instructions" && (
                        <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in">
                          <p className="p-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg">
                            <span className="material-symbols-outlined align-middle mr-2 text-primary">
                              info
                            </span>
                            Bu yemek için özel bir tarif adımı bulunmuyor.
                            Malzemeleri yukarıdaki listeye göre hazırlayıp,
                            genel pişirme yöntemlerini (haşlama, ızgara vb.)
                            kullanarak tüketebilirsin.
                          </p>
                        </div>
                      )}

                      {/* Nutrition Tab Content (Extra) */}
                      {activeTab === "Nutrition" && (
                        <div className="text-subtle-light dark:text-subtle-dark text-sm animate-fade-in">
                          <p>
                            Protein: {selectedMeal.protein}g | Karbonhidrat:{" "}
                            {selectedMeal.carbs}g | Yağ: {selectedMeal.fat}g
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
                    <p>Detayları görmek için soldan bir yemek seç.</p>
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
