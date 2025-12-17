import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserProfile, getUserProfile } from "../services/api";

export default function UserProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // --- YENİ STATE: Hangi Adımdayız? (1, 2 veya 3) ---
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    goal: "lose_weight",
    targetWeight: 68,
  });

  // --- 1. SAYFA YÜKLENİNCE PROFİLİ ÇEK ---
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const data = await getUserProfile();
        const profile = data.profile || data;
        if (profile) {
          setFormData({
            fullname: profile.fullname || "",
            age: profile.age || "",
            gender: profile.gender || "male",
            height: profile.height || "",
            weight: profile.weight || "",
            activityLevel: profile.activityLevel || "sedentary",
            goal: profile.goal || "lose_weight",
            targetWeight: profile.targetWeight || 68,
          });
        }
      } catch (error) {
        console.log("Yeni kayıt oluşturulacak.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfileData();
  }, [navigate]);

  // --- INPUT HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeightChange = (e) => {
    setFormData((prev) => ({ ...prev, targetWeight: e.target.value }));
  };

  // --- ADIM KONTROLÜ VE İLERLEME ---
  const handleNextStep = () => {
    // Adım 1 Validasyonu
    if (currentStep === 1) {
      if (
        !formData.fullname ||
        !formData.age ||
        !formData.height ||
        !formData.weight
      ) {
        alert("Lütfen tüm alanları doldurunuz.");
        return;
      }
    }
    // Sonraki adıma geç
    setCurrentStep((prev) => prev + 1);
    // Sayfanın en üstüne kaydır
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  // --- 2. KAYDETME İŞLEMİ (Sadece 3. Adımda Çalışır) ---
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const now = new Date();
    const profileDataToSend = {
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      targetWeight: Number(formData.targetWeight),
      updatedAt: now,
    };

    try {
      await saveUserProfile(profileDataToSend);
      console.log("Profil başarıyla kaydedildi.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Hata:", error);
      alert(error.message || "Profil kaydedilirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- YARDIMCI: Başlık ve Açıklama ---
  const getStepInfo = () => {
    switch (currentStep) {
      case 1:
        return { title: "Kişisel Bilgiler", desc: "Sizi tanıyalım" };
      case 2:
        return { title: "Yaşam Tarzı", desc: "Günlük aktiviteniz nasıl?" };
      case 3:
        return { title: "Ana Hedef", desc: "Neye ulaşmak istiyorsunuz?" };
      default:
        return { title: "", desc: "" };
    }
  };

  const stepInfo = getStepInfo();

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <p className="text-primary font-bold">Veriler Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
              {/* --- PROGRESS BAR BÖLÜMÜ --- */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-end">
                  <p className="text-gray-900 dark:text-white text-xl font-bold leading-normal">
                    Adım {currentStep} / 3: {stepInfo.title}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    %{Math.round((currentStep / 3) * 100)} Tamamlandı
                  </span>
                </div>
                {/* Dinamik Genişlik: width stiline dikkat */}
                <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  {stepInfo.desc}
                </p>
              </div>

              {/* --- ADIM 1: KİŞİSEL BİLGİLER --- */}
              {currentStep === 1 && (
                <section className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Temel Bilgileriniz
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        Ad Soyad
                      </span>
                      <input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="form-input h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark px-4 focus:border-primary focus:ring-primary dark:text-white"
                        placeholder="Adınızı giriniz"
                      />
                    </label>

                    <label className="flex flex-col gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        Yaş
                      </span>
                      <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="form-input h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark px-4 focus:border-primary focus:ring-primary dark:text-white"
                        placeholder="Yaşınızı giriniz"
                      />
                    </label>

                    <div className="flex flex-col gap-2">
                      <span className="text-gray-900 dark:text-white font-medium">
                        Cinsiyet
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {["male", "female"].map((g) => (
                          <label
                            key={g}
                            className={`flex items-center justify-center gap-2 p-4 border rounded-xl cursor-pointer transition-all ${
                              formData.gender === g
                                ? "bg-primary/20 border-primary ring-1 ring-primary"
                                : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span className="capitalize font-semibold text-gray-900 dark:text-white">
                              {g === "male" ? "Erkek" : "Kadın"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col gap-2">
                        <span className="text-gray-900 dark:text-white font-medium">
                          Boy (cm)
                        </span>
                        <input
                          name="height"
                          type="number"
                          value={formData.height}
                          onChange={handleInputChange}
                          className="form-input h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark px-4 focus:border-primary focus:ring-primary dark:text-white"
                          placeholder="175"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-gray-900 dark:text-white font-medium">
                          Kilo (kg)
                        </span>
                        <input
                          name="weight"
                          type="number"
                          value={formData.weight}
                          onChange={handleInputChange}
                          className="form-input h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark px-4 focus:border-primary focus:ring-primary dark:text-white"
                          placeholder="70"
                        />
                      </label>
                    </div>
                  </div>
                </section>
              )}

              {/* --- ADIM 2: YAŞAM TARZI --- */}
              {currentStep === 2 && (
                <section className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Günlük Aktiviteniz
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        val: "sedentary",
                        icon: "chair",
                        label: "Hareketsiz",
                        sub: "Masa başı iş / Az hareket",
                      },
                      {
                        val: "light",
                        icon: "directions_walk",
                        label: "Az Hareketli",
                        sub: "Haftada 1-3 gün egzersiz",
                      },
                      {
                        val: "moderate",
                        icon: "fitness_center",
                        label: "Orta Hareketli",
                        sub: "Haftada 3-5 gün spor",
                      },
                      {
                        val: "active",
                        icon: "sprint",
                        label: "Çok Hareketli",
                        sub: "Haftada 6-7 gün spor",
                      },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className={`flex flex-col p-6 border rounded-2xl cursor-pointer transition-all hover:shadow-md ${
                          formData.activityLevel === item.val
                            ? "bg-primary/10 border-primary ring-2 ring-primary"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-dark"
                        }`}
                      >
                        <input
                          className="sr-only"
                          name="activityLevel"
                          type="radio"
                          value={item.val}
                          checked={formData.activityLevel === item.val}
                          onChange={handleInputChange}
                        />
                        <span className="material-symbols-outlined text-4xl mb-3 text-primary">
                          {item.icon}
                        </span>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {item.sub}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* --- ADIM 3: HEDEF --- */}
              {currentStep === 3 && (
                <section className="space-y-6 animate-fadeIn">
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Hedefiniz Nedir?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        val: "lose_weight",
                        icon: "trending_down",
                        color: "text-orange-500",
                        label: "Kilo Ver",
                      },
                      {
                        val: "gain_weight",
                        icon: "sync_alt",
                        color: "text-yellow-500",
                        label: "Kiloyu Koru",
                      },
                      {
                        val: "gain_muscle",
                        icon: "trending_up",
                        color: "text-primary",
                        label: "Kas Yap",
                      },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${
                          formData.goal === item.val
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-400"
                        }`}
                      >
                        <input
                          className="sr-only"
                          name="goal"
                          type="radio"
                          value={item.val}
                          checked={formData.goal === item.val}
                          onChange={handleInputChange}
                        />
                        <span
                          className={`material-symbols-outlined text-5xl mb-3 ${item.color}`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <label className="block mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          Hedef Kilo
                        </span>
                        <span className="text-2xl font-black text-primary">
                          {formData.targetWeight} kg
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="150"
                        value={formData.targetWeight}
                        onChange={handleWeightChange}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Çubuğu kaydırarak hedef kilonuzu belirleyin.
                      </p>
                    </label>
                  </div>
                </section>
              )}

              {/* --- NAVİGASYON BUTONLARI --- */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
                {/* GERİ BUTONU (1. Adımda gizli) */}
                <div className="w-1/3">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold px-4 py-3 rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        arrow_back
                      </span>
                      Geri
                    </button>
                  )}
                </div>

                {/* İLERİ / KAYDET BUTONU */}
                <div className="w-1/3 flex justify-end">
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95"
                    >
                      Devam Et
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 active:scale-95 disabled:opacity-50"
                    >
                      {isLoading ? "Kaydediliyor..." : "Planımı Oluştur"}
                      {!isLoading && (
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
