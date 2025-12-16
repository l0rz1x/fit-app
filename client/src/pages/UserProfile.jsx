import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// DİKKAT: Yeni api.js'deki fonksiyonları import ediyoruz
import { saveUserProfile, getUserProfile } from "../services/api";

export default function UserProfile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Veri çekiliyor mu?

  // --- STATE ---
  const [formData, setFormData] = useState({
    fullname: "",
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    goal: "lose_weight", // UI seçenekleriyle uyumlu olması için güncelledim
    targetWeight: 68,
  });

  // --- 1. SAYFA YÜKLENİNCE PROFİLİ ÇEK ---
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        // Token yoksa login'e at
        navigate("/login");
        return;
      }

      try {
        const data = await getUserProfile();
        // Backend'den { profile: {...} } veya direkt {...} gelebilir yapına göre.
        // Genelde controller { profile: ... } döndürüyordu.
        const profile = data.profile || data;

        if (profile) {
          // Gelen veriyi form state'ine eşle
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
          console.log("✅ Mevcut profil verileri yüklendi.");
        }
      } catch (error) {
        // 404 gelirse (Profil yoksa) sorun değil, kullanıcı yeni oluşturacak.
        console.log("Henüz profil yok veya çekilemedi (Yeni Kayıt).");
      } finally {
        setIsFetching(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  // --- INPUT HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWeightChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      targetWeight: e.target.value,
    }));
  };

  // --- 2. KAYDETME İŞLEMİ (UPSERT) ---
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
      navigate("/login");
      return;
    }

    if (
      !formData.fullname ||
      !formData.age ||
      !formData.height ||
      !formData.weight
    ) {
      alert("Lütfen Ad Soyad, Yaş, Boy ve Kilo alanlarını doldurunuz.");
      return;
    }

    setIsLoading(true);

    const now = new Date();

    // Sayıları Number() formatına çeviriyoruz
    const profileDataToSend = {
      ...formData,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      targetWeight: Number(formData.targetWeight),
      updatedAt: now,
      createdAt: now,
      // Backend create yaparsa createdAt'i kendi ekler
    };

    try {
      // DİKKAT: saveUserProfile fonksiyonu hem create hem update yapar
      await saveUserProfile(profileDataToSend);

      console.log("Profil başarıyla kaydedildi.");
      // Kayıt başarılıysa dashboard'a yönlendir
      navigate("/dashboard");
    } catch (error) {
      console.error("Hata:", error);
      alert(error.message || "Profil kaydedilirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Eğer veri hala çekiliyorsa basit bir loading gösterebilirsin (Opsiyonel)
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
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-6 md:px-10 py-3">
              <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                <div className="size-8 text-primary">
                  {/* SVG İkonu */}
                  <svg
                    fill="none"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6_543)">
                      <path
                        d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                        fill="currentColor"
                      ></path>
                      <path
                        clipRule="evenodd"
                        d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                        fill="currentColor"
                        fillRule="evenodd"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_6_543">
                        <rect fill="white" height="48" width="48"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  Akıllı Beslenme
                </h2>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 dark:text-gray-900 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 disabled:opacity-50"
              >
                <span className="truncate">
                  {isLoading ? "Kaydediliyor..." : "Kaydet ve Devam Et"}
                </span>
              </button>
            </header>

            <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                    Adım 1 / 4: Kişisel Bilgiler
                  </p>
                </div>
                <div className="rounded-full bg-primary/20 dark:bg-primary/30">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                  Sizi tanıyalım
                </p>
              </div>

              <div className="flex flex-wrap justify-between gap-3">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Profilinizi {isFetching ? "Yükleniyor..." : "Oluşturun"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                    Size özel bir plan oluşturabilmemiz için kendinizden
                    bahsedin.
                  </p>
                </div>
              </div>

              {/* Bölüm 1: Kişisel Bilgiler */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                  Kişisel Bilgiler
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name -> Ad Soyad */}
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                      Ad Soyad
                    </p>
                    <input
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                      placeholder="Adınızı giriniz"
                    />
                  </label>

                  {/* Age -> Yaş */}
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                      Yaş
                    </p>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                      placeholder="Yaşınızı giriniz"
                    />
                  </label>

                  {/* Gender -> Cinsiyet */}
                  <div className="flex flex-col min-w-40 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                      Cinsiyet
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.gender === "male"
                            ? "bg-primary/20 border-primary"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          className="form-radio text-primary focus:ring-primary"
                          name="gender"
                          type="radio"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={handleInputChange}
                        />
                        <span className="text-gray-900 dark:text-white">
                          Erkek
                        </span>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.gender === "female"
                            ? "bg-primary/20 border-primary"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          className="form-radio text-primary focus:ring-primary"
                          name="gender"
                          type="radio"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={handleInputChange}
                        />
                        <span className="text-gray-900 dark:text-white">
                          Kadın
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Height & Weight -> Boy & Kilo */}
                  <div className="grid grid-cols-2 gap-6">
                    <label className="flex flex-col min-w-20 flex-1">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Boy (cm)
                      </p>
                      <input
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                        placeholder="175"
                      />
                    </label>
                    <label className="flex flex-col min-w-20 flex-1">
                      <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Kilo (kg)
                      </p>
                      <input
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                        placeholder="70"
                      />
                    </label>
                  </div>
                </div>
              </section>

              {/* Bölüm 2: Yaşam Tarzı ve Aktivite */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                  Yaşam Tarzı ve Aktivite
                </h2>
                <div className="flex flex-col">
                  <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                    Aktivite Seviyesi
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        val: "sedentary",
                        icon: "chair",
                        label: "Hareketsiz",
                        sub: "Egzersiz yok/çok az",
                      },
                      {
                        val: "light",
                        icon: "directions_walk",
                        label: "Az Hareketli",
                        sub: "Haftada 1-3 gün",
                      },
                      {
                        val: "moderate",
                        icon: "fitness_center",
                        label: "Orta Hareketli",
                        sub: "Haftada 3-5 gün",
                      },
                      {
                        val: "active",
                        icon: "sprint",
                        label: "Çok Hareketli",
                        sub: "Haftada 6-7 gün",
                      },
                    ].map((item) => (
                      <label
                        key={item.val}
                        className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors text-center ${
                          formData.activityLevel === item.val
                            ? "bg-primary/20 border-primary"
                            : "border-gray-300 dark:border-gray-600"
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
                        <span className="material-symbols-outlined text-4xl mb-2 text-gray-600 dark:text-gray-300">
                          {item.icon}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.sub}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bölüm 3: Ana Hedef */}
              <section className="space-y-4">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                  Ana Hedef
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      val: "lose_weight",
                      icon: "trending_down",
                      color: "#f56036",
                      label: "Kilo Ver",
                    },
                    {
                      val: "gain_weight",
                      icon: "sync_alt",
                      color: "#fbcf33",
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
                      className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.goal === item.val
                          ? "border-primary ring-4 ring-primary/20"
                          : "border-gray-300 dark:border-gray-600"
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
                        className={`material-symbols-outlined text-5xl mb-3 ${
                          item.val === "gain_muscle" ? "text-primary" : ""
                        }`}
                        style={{
                          color:
                            item.val !== "gain_muscle" ? item.color : undefined,
                        }}
                      >
                        {item.icon}
                      </span>
                      <span className="font-bold text-lg text-gray-900 dark:text-white">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Target Weight -> Hedef Kilo */}
                <div className="flex flex-col min-w-40 flex-1 pt-4">
                  <label
                    className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2 flex items-center gap-2"
                    htmlFor="target-weight-slider"
                  >
                    Hedef Kilo (kg)
                    <div className="relative group">
                      <span className="material-symbols-outlined text-base text-gray-400 cursor-help">
                        info
                      </span>
                      <div className="absolute bottom-full mb-2 w-60 bg-gray-800 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
                        Arzu ettiğiniz kiloyu belirleyin. Günlük kalori ve makro
                        hedeflerinizi buna göre hesaplayacağız.
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer dark:bg-primary/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                      id="target-weight-slider"
                      max="150"
                      min="40"
                      type="range"
                      value={formData.targetWeight}
                      onChange={handleWeightChange}
                    />
                    <input
                      className="form-input w-24 text-center rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-primary h-12 p-2 text-base font-normal leading-normal"
                      type="number"
                      value={formData.targetWeight}
                      onChange={handleWeightChange}
                    />
                  </div>
                </div>
              </section>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-14 px-6 bg-primary text-gray-900 text-lg font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  <span>
                    {isLoading ? "Oluşturuluyor..." : "Planımı Oluştur"}
                  </span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
