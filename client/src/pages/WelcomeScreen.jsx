import React, { useState, useEffect } from "react";
// Eğer özel bir CSS dosyan yoksa aşağıdaki satırı silebilirsin,
// çünkü Tailwind stilleri zaten index.css'ten geliyor.
// import "./styles/WelcomeScreen.css";

const WelcomeScreen = () => {
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
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/10 px-4 sm:px-10 py-3 transition-colors duration-300">
              <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
                <div className="size-8 text-primary">
                  {/* Logo SVG */}
                  <svg
                    fill="currentColor"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_6_543)">
                      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path>
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
              <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                <div className="flex items-center gap-9">
                  <a
                    className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
                    href="#"
                  >
                    Features
                  </a>
                  <a
                    className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
                    href="#"
                  >
                    How It Works
                  </a>
                  <a
                    className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
                    href="#"
                  >
                    Pricing
                  </a>
                  <a
                    className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
                    href="#"
                  >
                    Contact
                  </a>
                </div>
                <div className="flex gap-2 items-center">
                  {/* --- YENİ EKLENEN TEMA BUTONU --- */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all mr-2"
                  >
                    {theme === "light" ? (
                      <span className="material-symbols-outlined">
                        dark_mode
                      </span>
                    ) : (
                      <span className="material-symbols-outlined">
                        light_mode
                      </span>
                    )}
                  </button>
                  {/* -------------------------------- */}

                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/20 text-gray-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 dark:hover:bg-primary/30 transition-colors">
                    <span className="truncate">Log In</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-gray-900 dark:text-gray-900 text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                    <span className="truncate">Sign Up</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
              <div className="@container">
                <div className="flex flex-col gap-12 px-4 py-10 @[864px]:flex-row @[864px]:items-center">
                  <div className="flex flex-col gap-8 @[864px]:justify-center @[864px]:w-1/2">
                    <div className="flex flex-col gap-4 text-left">
                      <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Your Smart Nutrition & Fitness Planner
                      </h1>
                      <h2 className="text-gray-700 dark:text-gray-300 text-base font-normal leading-relaxed @[480px]:text-lg @[480px]:font-normal @[480px]:leading-relaxed">
                        Personalized meal and workout plans created from the
                        ingredients you already have. Eat smarter, train better.
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
                            AI-Powered Personalization
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
                            Reduce Food Waste
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
                            Achieve Your Goals
                          </h2>
                        </div>
                      </div>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-gray-900 dark:text-gray-900 text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                      <span className="truncate">Get Started for Free</span>
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
                  TRUSTED BY THOUSANDS OF HEALTH ENTHUSIASTS
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
