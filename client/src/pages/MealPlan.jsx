import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/api";

const NutritionScreen = () => {
  const navigate = useNavigate();

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

  // --- STATE ---
  const [activeDay, setActiveDay] = useState(() => {
    const todayIndex = new Date().getDay(); 
    const daysEnglish = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysEnglish[todayIndex];
  });

  const [dietPlan, setDietPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  
  // LocalStorage Sepet
  const [shoppingCart, setShoppingCart] = useState(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [showCart, setShowCart] = useState(false);
  
  // YENİ STATE: Resim Önizleme Modalı için
  const [previewImage, setPreviewImage] = useState(null);

  // Sepet Kayıt
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  // --- AKILLI RESİM FONKSİYONU ---
  const getMealImage = (mealData) => {
    if (mealData.image && mealData.image.startsWith("http")) {
      return mealData.image;
    }

    const lowerName = (mealData.meal_name || "").toLowerCase();

    if (lowerName.includes("yumurta") || lowerName.includes("omlet") || lowerName.includes("kahvaltı"))
      return "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2000&auto=format&fit=crop";
    if (lowerName.includes("salata") || lowerName.includes("bowl"))
      return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop";
    if (lowerName.includes("tavuk") || lowerName.includes("hindi"))
      return "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2000&auto=format&fit=crop";
    if (lowerName.includes("balık") || lowerName.includes("somon"))
      return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2000&auto=format&fit=crop";
    if (lowerName.includes("et") || lowerName.includes("köfte") || lowerName.includes("kebap"))
      return "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop";
    if (lowerName.includes("makarna"))
      return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2000&auto=format&fit=crop";
    
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop";
  };

  // --- SEPET FONKSİYONLARI ---
  const addToCart = (ingredients) => {
    if (!Array.isArray(ingredients)) return;
    const newItems = ingredients.filter(item => 
      item && item.trim() && !shoppingCart.includes(item.trim())
    );
    setShoppingCart(prev => [...prev, ...newItems.map(i => i.trim())]);
  };

  const removeFromCart = (ingredient) => {
    setShoppingCart(prev => prev.filter(item => item !== ingredient));
  };

  const clearCart = () => {
    if(window.confirm("Sepeti tamamen temizlemek istediğine emin misin?")) {
      setShoppingCart([]);
    }
  };

  const copyToClipboard = () => {
    const listText = "🛒 Alışveriş Listem:\n\n" + shoppingCart.map(item => `- ${item}`).join("\n");
    navigator.clipboard.writeText(listText).then(() => {
      alert("Liste kopyalandı!");
    });
  };

  const shareToWhatsapp = () => {
    const listText = "🛒 Alışveriş Listem:\n\n" + shoppingCart.map(item => `- ${item}`).join("\n");
    const url = `https://wa.me/?text=${encodeURIComponent(listText)}`;
    window.open(url, '_blank');
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

          if (!Array.isArray(planData) && planData.diet_plan && Array.isArray(planData.diet_plan)) {
            planData = planData.diet_plan;
          }

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

  // --- GÜN FİLTRELEME ---
  const currentDayData = useMemo(() => {
    if (!dietPlan || !Array.isArray(dietPlan) || dietPlan.length === 0)
      return null;

    const dayIndex = daysMap.findIndex((d) => d.en === activeDay);
    const dayObj = daysMap[dayIndex];
    const trName = dayObj ? dayObj.tr : "Pazartesi";
    const genericDayName = `${dayIndex + 1}. Gün`;

    let foundMeals = [];

    const dayObject = dietPlan.find((item) => {
      const dName = (item.day || item.gun || "").toString().trim();
      if (trName === "Pazar") {
        return (
          dName === "Pazar" ||
          (dName.includes("Pazar") && !dName.includes("Pazartesi")) ||
          dName === genericDayName
        );
      }
      return dName === trName || dName.includes(trName) || dName === genericDayName;
    });

    if (dayObject && Array.isArray(dayObject.recipes_cards)) {
      foundMeals = dayObject.recipes_cards;
    } else {
      foundMeals = dietPlan.filter((item) => {
        const dName = (item.day || item.gun || "").toString().trim();
        return dName === trName || dName.includes(trName);
      });
    }

    if (!foundMeals || foundMeals.length === 0) return null;

    const formattedMeals = foundMeals.map((m) => {
      let calVal = 0;
      if (m.calories) {
        if (typeof m.calories === "string") {
          calVal = parseInt(m.calories.replace(/\D/g, "")) || 0;
        } else {
          calVal = m.calories;
        }
      }

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
        image: m.img_url || m.image || null, 
      };
    });

    return { meals: formattedMeals };
  }, [dietPlan, activeDay]);

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

  if (!dietPlan || !Array.isArray(dietPlan) || dietPlan.length === 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background-light dark:bg-background-dark gap-4">
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
          Henüz bir beslenme planın yok.
        </h2>
        <button
          onClick={() => navigate("/nutrition-chat")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition shadow-lg shadow-primary/30 cursor-pointer"
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
                          style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
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
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {currentDayData.meals?.map((meal, idx) => {
                      const isActive = selectedMeal && selectedMeal.meal_name === meal.meal_name;
                      const mealImg = getMealImage(meal); 

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedMeal(meal)}
                          className={`flex gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                            isActive
                              ? "bg-primary/20 border-2 border-primary"
                              : "bg-surface-light dark:bg-surface-dark border border-transparent hover:border-primary/50"
                          }`}
                        >
                          {/* Liste Resmi (Thumbnail) */}
                          <div 
                            className="flex-shrink-0 w-16 h-16 rounded-lg bg-center bg-cover bg-no-repeat shadow-sm"
                            style={{ backgroundImage: `url("${mealImg}")` }}
                          ></div>

                          {/* Yemek Bilgileri */}
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <p className="text-text-light dark:text-text-dark text-sm font-bold leading-tight truncate">
                              {meal.meal_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-subtle-light dark:text-subtle-dark text-xs flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-orange-500" style={{ fontSize: '14px' }}>
                                  local_fire_department
                                </span>
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
                  <div className="flex flex-col gap-5">
                     {/* BÜYÜK RESİM (HERO IMAGE) */}
                     {/* 1. cursor-zoom-in: Tıklanabilir olduğunu gösterir
                        2. onClick: Modalı açar
                        3. style: En sevdiğin 'kesik ama şık' (bg-cover) stilini korudum.
                     */}
                     <div 
                        className="w-full h-48 md:h-64 rounded-2xl bg-cover bg-center shadow-lg mb-2 relative group cursor-zoom-in"
                        style={{ backgroundImage: `url("${getMealImage(selectedMeal)}")` }}
                        onClick={() => setPreviewImage(getMealImage(selectedMeal))}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                           <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg">
                             zoom_in
                           </span>
                        </div>
                      </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h2 className="text-text-light dark:text-text-dark text-2xl md:text-3xl font-bold leading-tight">
                            {selectedMeal.meal_name}
                          </h2>
                          {selectedMeal.prep_time && (
                            <div className="flex items-center gap-1.5 mt-2 text-subtle-light dark:text-subtle-dark">
                              <span className="material-symbols-outlined text-base">timer</span>
                              <span className="text-sm">Hazırlık: {selectedMeal.prep_time} dk</span>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => setShowCart(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xl">shopping_cart</span>
                          <span className="text-sm font-medium hidden sm:inline">
                            Sepet ({shoppingCart.length})
                          </span>
                        </button>
                      </div>

                      {/* Makro Kartları */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 border border-orange-200 dark:border-orange-800 cursor-default">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="material-symbols-outlined text-orange-500 text-lg">local_fire_department</span>
                            <span className="text-xs text-subtle-light dark:text-subtle-dark">Kalori</span>
                          </div>
                          <p className="text-text-light dark:text-text-dark text-lg font-bold">{selectedMeal.calories}</p>
                          <p className="text-xs text-subtle-light dark:text-subtle-dark">kcal</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800 cursor-default">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="material-symbols-outlined text-blue-500 text-lg">egg_alt</span>
                            <span className="text-xs text-subtle-light dark:text-subtle-dark">Protein</span>
                          </div>
                          <p className="text-text-light dark:text-text-dark text-lg font-bold">{selectedMeal.protein}</p>
                          <p className="text-xs text-subtle-light dark:text-subtle-dark">gram</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800 cursor-default">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="material-symbols-outlined text-green-500 text-lg">bakery_dining</span>
                            <span className="text-xs text-subtle-light dark:text-subtle-dark">Karb</span>
                          </div>
                          <p className="text-text-light dark:text-text-dark text-lg font-bold">{selectedMeal.carbs}</p>
                          <p className="text-xs text-subtle-light dark:text-subtle-dark">gram</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 border border-yellow-200 dark:border-yellow-800 cursor-default">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="material-symbols-outlined text-yellow-500 text-lg">opacity</span>
                            <span className="text-xs text-subtle-light dark:text-subtle-dark">Yağ</span>
                          </div>
                          <p className="text-text-light dark:text-text-dark text-lg font-bold">{selectedMeal.fat}</p>
                          <p className="text-xs text-subtle-light dark:text-subtle-dark">gram</p>
                        </div>
                      </div>
                    </div>

                    {/* Malzemeler Kartı */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-xl">grocery</span>
                          <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Malzemeler</h3>
                        </div>
                        
                        {Array.isArray(selectedMeal.items) && selectedMeal.items.length > 0 && (
                          <button 
                            onClick={() => addToCart(selectedMeal.items)}
                            className="text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            Hepsini Sepete Ekle
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {Array.isArray(selectedMeal.items) && selectedMeal.items.length > 0 ? (
                          selectedMeal.items.map((ingredient, idx) => {
                            const isInCart = shoppingCart.includes(ingredient.trim());
                            return (
                              <div
                                key={idx}
                                className={`flex items-center justify-between gap-2 p-2 rounded-lg border transition-all cursor-pointer group ${
                                  isInCart
                                    ? 'bg-primary/5 border-primary/50'
                                    : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                                onClick={() => {
                                  if (isInCart) removeFromCart(ingredient.trim());
                                  else setShoppingCart(prev => [...prev, ingredient.trim()]);
                                }}
                              >
                                <div className="flex items-start gap-2 flex-1 min-w-0">
                                  <span 
                                    className={`material-symbols-outlined flex-shrink-0 transition-colors ${isInCart ? 'text-primary' : 'text-gray-400'}`} 
                                    style={{ fontSize: '18px', marginTop: '2px' }}
                                  >
                                    {isInCart ? 'check_circle' : 'radio_button_unchecked'}
                                  </span>
                                  <span className={`text-sm truncate ${isInCart ? 'text-text-light font-medium line-through opacity-70' : 'text-text-light/90'}`}>
                                    {ingredient}
                                  </span>
                                </div>
                                <span className={`material-symbols-outlined text-lg transition-colors ${isInCart ? 'text-primary' : 'text-gray-300 group-hover:text-primary/50'}`}>
                                  {isInCart ? 'shopping_cart' : 'add'}
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-subtle-light text-sm col-span-2">Malzeme bilgisi bulunmuyor.</p>
                        )}
                      </div>
                    </div>

                    {/* Tarif Kartı */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-border-light dark:border-border-dark">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                        <h3 className="text-text-light dark:text-text-dark text-lg font-bold">Hazırlanışı</h3>
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="text-text-light dark:text-text-dark/90 text-sm leading-relaxed whitespace-pre-line">
                          {selectedMeal.instructions || "Bu yemek için özel bir tarif adımı bulunmuyor."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-subtle-light">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">restaurant_menu</span>
                    <p>
                      {currentDayData ? "Detayları görmek için soldan bir yemek seç." : "Bu gün için görüntülenecek öğün yok."}
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* --- RESİM ÖNİZLEME MODALI (Lightbox) --- */}
      {previewImage && (
        <div 
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setPreviewImage(null)}
        >
            <div className="relative max-w-5xl max-h-screen w-full h-full flex items-center justify-center">
                 {/* Kapatma butonu */}
                 <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full cursor-pointer z-50">
                    <span className="material-symbols-outlined text-3xl">close</span>
                 </button>
                 
                 <img 
                    src={previewImage} 
                    alt="Tam ekran önizleme" 
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
                    onClick={(e) => e.stopPropagation()} // Resme tıklayınca kapanmasın
                 />
            </div>
        </div>
      )}

      {/* Sepet Modal */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCart(false)}
        >
          <div 
            className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border-light dark:border-border-dark">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
                <h2 className="text-text-light dark:text-text-dark text-xl font-bold">Alışveriş Sepeti</h2>
              </div>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1">
              {shoppingCart.length > 0 ? (
                <div className="space-y-2">
                  {shoppingCart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 p-3 bg-surface-light dark:bg-surface-dark rounded-lg group hover:bg-primary/5">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="material-symbols-outlined text-primary text-base flex-shrink-0">check_circle</span>
                        <span className="text-text-light dark:text-text-dark text-sm truncate">{item}</span>
                      </div>
                      <button onClick={() => removeFromCart(item)} className="p-1.5 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                   <span className="material-symbols-outlined text-6xl text-subtle-light opacity-50 mb-3">shopping_cart</span>
                   <p className="text-text-light font-medium">Sepetiniz boş</p>
                </div>
              )}
            </div>
            
             {shoppingCart.length > 0 && (
              <div className="p-5 border-t border-border-light dark:border-border-dark bg-surface-light/50 space-y-3">
                <div className="flex items-center justify-between mb-1">
                   <span className="text-text-light font-medium">Toplam {shoppingCart.length} malzeme</span>
                   <button onClick={clearCart} className="text-red-500 text-sm font-medium hover:text-red-600 cursor-pointer">Tümünü Temizle</button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={copyToClipboard} 
                        className="flex items-center justify-center gap-2 py-3 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark rounded-lg font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined">content_copy</span>
                        Kopyala
                    </button>
                    <button 
                        onClick={shareToWhatsapp} 
                        className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#128C7E] transition-colors cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Paylaş
                    </button>
                </div>
              </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionScreen;