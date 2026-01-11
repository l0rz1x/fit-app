import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- BİLEŞENLERİNİ IMPORT ET ---
// Dosya yollarını kendi klasör yapına göre kontrol et (örn: ./pages/Login)
import Header from "./components/Header";
import WelcomeScreen from "./pages/WelcomeScreen";
import Login from "./pages/LoginScreen";
import Register from "./pages/RegisterScreen"; // Register sayfan varsa
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile"; // Profil oluşturma sayfan
import Contact from "./pages/Contact";
import Workout from "./pages/Workout";
import MealPlan from "./pages/MealPlan";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound"; // 404 sayfasi
import Assistant from "./pages/Assistant"; // Yapay zeka asistan sayfası
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // --- TEMA AYARLARI ---
  // Kullanıcının tercihini localStorage'dan al, yoksa 'light' yap
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Tema değiştiğinde HTML etiketine class ekle (Tailwind Dark Mode için şart)
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    // Ana kapsayıcı div
    <div
      className={`min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-white transition-colors duration-300`}
    >
      <Router>
        {/* 1. HEADER BURAYA GELİR 
          Routes'un dışında olduğu için her sayfada görünür.
          theme ve toggleTheme'i props olarak gönderiyoruz.
        */}

        <ScrollToTop />

        <Header theme={theme} toggleTheme={toggleTheme} />

        {/* 2. SAYFA İÇERİKLERİ BURAYA GELİR */}
        <main>
          <Routes>
            {/* Açık Rotalar (Giriş yapmadan görülebilenler) */}
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Korumalı Rotalar (Giriş yaptıktan sonra gidilenler) */}
            <Route path="/workout" element={<Workout />} />
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/assistant" element={<Assistant />} />

            {/* 404 Sayfası (Eşleşmeyen rota olursa) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
