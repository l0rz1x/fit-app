import React, { useState, useEffect } from "react";
// Eğer özel bir CSS dosyan yoksa aşağıdaki satırı silebilirsin,
// çünkü Tailwind stilleri zaten index.css'ten geliyor.
// import "./styles/WelcomeScreen.css";

// ##################################
//!!!!!!
// bu kısım şimdilik burda nav bar için ayrı bir component yaptığımda taşıyacağım
//login ve signup butonlarına tıklanınca yönlendirme

import { useNavigate } from "react-router-dom";

// ############################################

const WelcomeScreen = () => {
  // ##################################
  //!!!!!!
  // bu kısım şimdilik burda nav bar için ayrı bir component yaptığımda taşıyacağım
  //login ve signup butonlarına tıklanınca yönlendirme
  const navigate = useNavigate();
  // ############################################

  // 1. State: Tarayıcı hafızasını (localStorage) kontrol et, yoksa varsayılan 'light'
  const [theme, setTheme] = useState(() => {
    // SSR (Server Side Rendering) kontrolü ve localStorage okuma
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // 2. Effect: Tema değiştiğinde HTML etiketini güncelle ve hafızaya kaydet
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Temayı değiştiren fonksiyon
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display transition-colors duration-300">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 lg:px-10 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            {/* Header Section */}

            {/* Main Content */}
            <main className="flex-1">
              <div className="@container">
                <div className="flex flex-col gap-12 px-4 py-10 @[864px]:flex-row @[864px]:items-center">
                  <div className="flex flex-col gap-8 @[864px]:justify-center @[864px]:w-1/2">
                    <div className="flex flex-col gap-4 text-left">
                      <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Akıllı Beslenme ve Fitness Planlayıcınız
                      </h1>
                      <h2 className="text-gray-700 dark:text-gray-300 text-base font-normal leading-relaxed @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed">
                        Sahip olduğunuz malzemelerden oluşturulmuş
                        kişiselleştirilmiş yemek ve egzersiz planları. Daha
                        akıllıca beslenin, daha iyi antrenman yapın.
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-0">
                        <div className="flex flex-1 gap-3 items-center">
                          <div className="text-primary">
                            <span
                              className="material-symbols-outlined text-4xl"
                              style={{ color: "#fbcf33" }}
                            >
                              psychology
                            </span>
                          </div>
                          <h2 className="text-gray-800 dark:text-gray-200 text-sm font-bold leading-tight">
                            Yapay Zeka Destekli Kişiselleştirme
                          </h2>
                        </div>
                        <div className="flex flex-1 gap-3 items-center">
                          <div className="text-primary">
                            <span
                              className="material-symbols-outlined text-4xl"
                              style={{ color: "#2dce89" }}
                            >
                              recycling
                            </span>
                          </div>
                          <h2 className="text-gray-800 dark:text-gray-200 text-sm font-bold leading-tight">
                            Sürdürülebilir Gıda Tüketimi
                          </h2>
                        </div>
                        <div className="flex flex-1 gap-3 items-center">
                          <div className="text-primary">
                            <span
                              className="material-symbols-outlined text-4xl"
                              style={{ color: "#f56036" }}
                            >
                              trending_up
                            </span>
                          </div>
                          <h2 className="text-gray-800 dark:text-gray-200 text-sm font-bold leading-tight">
                            Hedeflerinize Ulaşın
                          </h2>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/login")}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-gray-900 dark:text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                    >
                      <span className="truncate">Ücretsiz Başlayın</span>
                    </button>
                  </div>
                  <div className="w-full @[864px]:w-1/2">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl shadow-lg dark:shadow-gray-900/50"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-q84cCm23dcsmuAxVVyGgBhtmFXJASqS2AFm6QOg8pyISbrk087bblhghHNandCCAQS8h1LdUqK8UPhwH9ANf6YckgmkC7yPHXyBve2ANDxgcqm0iYkNDC3zDgfRRSQQFS6TgNFR80TLWGI47FNFisxB-ed4qx1Ff2Cr7rdC3nZVFEij5AW-BWad-wy_kycOW80GgTavC7IG-ukRAseC-eMph-me--OHNweFGp26-z7vOY3BKd1FDK6tWCIMPQmKKJyZJk97hmQWK")',
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Trusted By Section */}
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <h4 className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-normal tracking-[0.015em] text-center">
                  BİNLERCE SAĞLIK TÜKETİCİSİ TARAFINDAN GÜVENİLİR
                </h4>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className="flex flex-col gap-3 items-center justify-center"
                    >
                      <div
                        className="h-10 w-32 bg-center bg-no-repeat bg-contain opacity-60 dark:opacity-40 hover:opacity-100 transition-opacity"
                        style={{
                          backgroundImage: `url("http://googleusercontent.com/profile/picture/${num}")`,
                          filter:
                            theme === "dark"
                              ? "grayscale(1) brightness(0.8) invert(1)"
                              : "grayscale(1) brightness(0.5) contrast(0.5)",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
