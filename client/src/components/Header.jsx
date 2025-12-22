import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation(); // Sayfa değişimlerini dinliyoruz
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sayfa her değiştiğinde token var mı kontrol et
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, [location]);

  // Çıkış Yap Fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  // --- AKTİF TAB STİL FONKSİYONU ---
  // Hangi sayfadaysak o butonu hafif gri ve kalın yapar
  const getNavLinkClass = (path) => {
    const isActive = location.pathname === path;

    // Ortak stiller
    const baseStyle =
      "text-sm font-medium leading-normal transition-all cursor-pointer px-4 py-2 rounded-lg duration-200 active:scale-95";

    // Aktifse (Gri Arkaplan)
    if (isActive) {
      return `${baseStyle} bg-gray-200 dark:bg-white/20 text-gray-900 dark:text-white font-bold shadow-sm`;
    }

    // Pasifse (Hover efekti)
    return `${baseStyle} text-gray-800 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10`;
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/10 px-4 sm:px-10 py-3 transition-colors duration-300">
      {/* --- SOL TARAFTAKİ LOGO --- */}
      <div
        onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
        className="flex items-center gap-4 text-gray-800 dark:text-gray-200 cursor-pointer select-none group"
      >
        <div className="size-8 text-primary group-hover:scale-110 transition-transform duration-300">
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

      {/* --- SAĞ TARAF --- */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-8">
        {/* --- IF: KULLANICI GİRİŞ YAPMIŞSA --- */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/workout")}
              className={getNavLinkClass("/workout")}
            >
              Workout
            </button>
            <button
              onClick={() => navigate("/mealplan")}
              className={getNavLinkClass("/mealplan")}
            >
              Meal Plan
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className={getNavLinkClass("/dashboard")}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/userprofile")}
              className={getNavLinkClass("/userprofile")}
            >
              Profilim
            </button>
            <button
              onClick={() => navigate("/assistant")}
              className={getNavLinkClass("/assistant")}
            >
              Chatbot
            </button>

            {/* Tema Butonu */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ml-2"
            >
              {theme === "light" ? (
                <span className="material-symbols-outlined">dark_mode</span>
              ) : (
                <span className="material-symbols-outlined">light_mode</span>
              )}
            </button>

            {/* ÇIKIŞ BUTONU */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 ml-3 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Çıkış
            </button>
          </div>
        ) : (
          /* --- ELSE: KULLANICI GİRİŞ YAPMAMIŞSA --- */
          <>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/pricing")}
                className={getNavLinkClass("/pricing")}
              >
                Pricing
              </button>
              <button
                onClick={() => navigate("/contact")}
                className={getNavLinkClass("/contact")}
              >
                Contact
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {theme === "light" ? (
                <span className="material-symbols-outlined">dark_mode</span>
              ) : (
                <span className="material-symbols-outlined">light_mode</span>
              )}
            </button>

            <div className="flex gap-2 items-center">
              <button
                onClick={() => navigate("/login")}
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/20 text-gray-800 dark:text-white text-sm font-bold hover:bg-primary/30 dark:hover:bg-primary/30 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-gray-900 dark:text-gray-900 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
