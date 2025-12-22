import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Assistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // --- 1. STATE: Hangi Moddayız? ('nutrition' veya 'fitness') ---
  const [activeTab, setActiveTab] = useState("nutrition");

  // --- 2. STATE: Kullanıcı Bilgisi & Input ---
  const [userName, setUserName] = useState("Misafir");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // --- 3. STATE: İki Ayrı Sohbet Geçmişi ---
  const [chatHistory, setChatHistory] = useState({
    nutrition: [
      {
        id: 1,
        sender: "ai",
        text: "Selam! 🥦 Ben senin Beslenme Asistanınım. Buzdolabındakilerle ne yapabiliriz veya bugün kaç kalori aldın, konuşalım mı?",
        time: "09:41",
        mode: "nutrition",
      },
    ],
    fitness: [
      {
        id: 1,
        sender: "ai",
        text: "Merhaba Şampiyon! 💪 Ben senin Spor Koçunum. Bugün hangi bölgeyi çalıştırıyoruz? Kardiyo mu ağırlık mı?",
        time: "09:41",
        mode: "fitness",
      },
    ],
  });

  // Kullanıcı Adını Çek
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.fullname) setUserName(parsed.fullname);
      } catch (e) {}
    } else {
      setUserName("Baris Username gelmedi");
    }
  }, []);

  // Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Chat değiştiğinde veya yazı yazarken scroll yap
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, activeTab, isTyping]);

  // --- MESAJ GÖNDERME ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      time: timeString,
    };

    // Hangi tab açıksa o geçmişe ekle
    setChatHistory((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newUserMsg],
    }));

    setInputMessage("");
    setIsTyping(true);

    // AI Cevabını Simüle Et
    setTimeout(() => {
      let aiResponseText = "";
      let msgType = "text"; // 'text' veya 'recipe' veya 'workout'
      let extraData = {};

      // AÇIK OLAN TAB'A GÖRE CEVAP ÜRET
      if (activeTab === "nutrition") {
        const responses = [
          "Bunun için harika bir tarifim var! 🥗",
          "Kalori hedefin için bunu biraz daha proteinle dengelemelisin.",
          "Su içmeyi unutma! Bu öğün biraz tuzlu olabilir.",
          "Listene avokado ve ceviz ekledim, sağlıklı yağlar önemli.",
        ];
        aiResponseText =
          responses[Math.floor(Math.random() * responses.length)];

        // %30 ihtimalle tarif kartı göstersin
        if (Math.random() > 0.7) {
          msgType = "recipe";
          extraData = {
            title: "Izgara Tavuklu Kinoa Salatası",
            image:
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop",
            calories: "420 kcal",
            protein: "32g",
            time: "20 dk",
          };
        }
      } else {
        // FITNESS MODE
        const responses = [
          "Hadi bakalım! Nabzı yükseltme zamanı. 🏃‍♂️",
          "Bu hareket formunu korumak çok önemli, dik durmaya çalış.",
          "Dinlenme günlerini sakın atlama, kaslar dinlenirken gelişir.",
          "Bugün bacak günü olsun mu? Enerjin yüksek görünüyor!",
        ];
        aiResponseText =
          responses[Math.floor(Math.random() * responses.length)];
      }

      const newAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponseText,
        time: `${now.getHours()}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        type: msgType,
        ...extraData,
      };

      setChatHistory((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newAiMsg],
      }));
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Aktif olan mesajları seç
  const currentMessages = chatHistory[activeTab];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark">
      {/* --- SOL SIDEBAR --- */}
      <aside className="w-[280px] bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 h-full hidden md:flex transition-all duration-300">
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Mod Seçimi
            </p>

            {/* Dashboard Linki */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 w-full text-left group transition-colors mb-4"
            >
              <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">
                dashboard
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                Dashboard
              </span>
            </button>

            {/* --- TAB 1: BESLENME --- */}
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left group transition-all ${
                activeTab === "nutrition"
                  ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                  : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  activeTab === "nutrition" ? "fill-1" : ""
                }`}
              >
                restaurant_menu
              </span>
              <span className="text-sm font-bold">Yemek Asistanı</span>
            </button>

            {/* --- TAB 2: SPOR --- */}
            <button
              onClick={() => setActiveTab("fitness")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left group transition-all ${
                activeTab === "fitness"
                  ? "bg-accent-orange/10 text-accent-orange shadow-sm ring-1 ring-accent-orange/20"
                  : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  activeTab === "fitness" ? "fill-1" : ""
                }`}
              >
                fitness_center
              </span>
              <span className="text-sm font-bold">Spor Koçu</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Hızlı İşlemler
            </p>
            <button
              onClick={() => navigate("/plans")}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white truncate block text-left w-full hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              📋 Yemek Planlarım
            </button>
            <button
              onClick={() => navigate("/workouts")}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent-orange dark:hover:text-white truncate block text-left w-full hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              💪 Antrenman Programım
            </button>
          </div>
        </nav>

        {/* Profil Alanı */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => navigate("/userprofile")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left group"
          >
            <div
              className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm shrink-0"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop")',
              }}
            ></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                {userName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Profili Düzenle
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* --- ANA İÇERİK (CHAT) --- */}
      <main className="flex-1 flex flex-col h-full relative bg-white dark:bg-background-dark">
        {/* Chat Başlığı (Mobilde veya Masaüstünde bağlamı göstermek için) */}
        <div
          className={`flex items-center gap-3 px-6 py-3 border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm sticky top-0 z-10 ${
            activeTab === "nutrition" ? "bg-primary/5" : "bg-accent-orange/5"
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              activeTab === "nutrition"
                ? "bg-primary/20 text-primary"
                : "bg-accent-orange/20 text-accent-orange"
            }`}
          >
            <span className="material-symbols-outlined">
              {activeTab === "nutrition" ? "restaurant" : "directions_run"}
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              {activeTab === "nutrition" ? "Beslenme Asistanı" : "Spor Koçu"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {activeTab === "nutrition"
                ? "Tarifler, Kalori, Diyet"
                : "Egzersiz, Setler, Kardiyo"}
            </p>
          </div>
        </div>

        {/* Mesaj Listesi */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-32">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-3xl ${
                msg.sender === "user" ? "ml-auto justify-end" : ""
              }`}
            >
              {msg.sender === "ai" && (
                <div
                  className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg ${
                    activeTab === "nutrition"
                      ? "bg-gradient-to-br from-primary to-green-600 shadow-primary/20"
                      : "bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {activeTab === "nutrition" ? "smart_toy" : "fitness_center"}
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col gap-2 flex-1 ${
                  msg.sender === "user" ? "items-end" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {msg.sender === "ai"
                      ? activeTab === "nutrition"
                        ? "Diyetisyen AI"
                        : "Koç AI"
                      : "Sen"}
                  </span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>

                {/* İçerik */}
                {msg.type === "recipe" ? (
                  <div className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-md w-full">
                    <div
                      className="h-40 bg-gray-200 bg-cover bg-center relative"
                      style={{ backgroundImage: `url("${msg.image}")` }}
                    >
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-accent-yellow">
                          bolt
                        </span>{" "}
                        {msg.calories}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {msg.title}
                      </h3>
                      <button className="w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 mt-4">
                        <span className="material-symbols-outlined text-lg">
                          add
                        </span>
                        Günlüğe Ekle
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? `text-white rounded-tr-none ${
                            activeTab === "nutrition"
                              ? "bg-primary"
                              : "bg-accent-orange"
                          }`
                        : "bg-gray-50 dark:bg-surface-dark text-gray-800 dark:text-gray-200 rounded-tl-none border border-transparent dark:border-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Effect */}
          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div
                className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 ${
                  activeTab === "nutrition" ? "bg-primary" : "bg-accent-orange"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  more_horiz
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md pt-2 pb-6 px-4 border-t border-transparent z-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {/* Context Chips (Tab'a göre değişir) */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {activeTab === "nutrition" ? (
                <>
                  <button
                    onClick={() =>
                      setInputMessage("Yüksek proteinli kahvaltı öner")
                    }
                    className="chip-btn text-primary bg-primary/5 hover:bg-primary/10"
                  >
                    🥞 Protein Kahvaltı
                  </button>
                  <button
                    onClick={() =>
                      setInputMessage("Elimde tavuk ve mantar var")
                    }
                    className="chip-btn text-green-600 bg-green-50 hover:bg-green-100"
                  >
                    🍄 Tarif Üret
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setInputMessage("30 dk HIIT kardiyo")}
                    className="chip-btn text-accent-orange bg-orange-50 hover:bg-orange-100"
                  >
                    🔥 HIIT Kardiyo
                  </button>
                  <button
                    onClick={() => setInputMessage("Sırt ağrısı için esneme")}
                    className="chip-btn text-blue-500 bg-blue-50 hover:bg-blue-100"
                  >
                    🧘‍♂️ Esneme
                  </button>
                </>
              )}
            </div>

            <div className="relative flex items-end gap-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-32 text-sm"
                placeholder={
                  activeTab === "nutrition"
                    ? "Bir tarif sor veya yediklerini anlat..."
                    : "Antrenman planı veya egzersiz sor..."
                }
                rows="1"
              ></textarea>
              <div className="flex items-center gap-1 pb-1">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 text-white rounded-lg shadow-md transition-all shrink-0 flex items-center justify-center ${
                    !inputMessage.trim()
                      ? "bg-gray-300"
                      : activeTab === "nutrition"
                      ? "bg-primary hover:bg-primary-hover"
                      : "bg-accent-orange hover:bg-orange-600"
                  }`}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-400">
              AI Asistan sağlık tavsiyeleri verebilir, profesyonel görüş yerine
              geçmez.
            </p>
          </div>
        </div>
      </main>

      {/* --- SAĞ SIDEBAR (WIDGETLAR - TAB'A GÖRE DEĞİŞEBİLİR) --- */}
      {/* --- SAĞ SIDEBAR (WIDGETLAR) --- */}
      {/* --- SAĞ SIDEBAR (WIDGETLAR - TAB'A GÖRE DEĞİŞEBİLİR) --- */}
      <aside className="w-[320px] bg-background-subtle dark:bg-background-dark border-l border-gray-200 dark:border-gray-800 hidden xl:flex flex-col shrink-0 overflow-y-auto p-6 gap-6">
        {activeTab === "nutrition" ? (
          // --- BESLENME MODU SIDEBAR ---
          <div className="flex flex-col gap-5">
            {/* 1. Kalori Halkası */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Günlük Kalori
              </h3>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                <div
                  className="relative size-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                  style={{
                    background: `conic-gradient(#2dcd88 65%, transparent 0)`,
                  }}
                >
                  <div className="absolute inset-1 bg-white dark:bg-surface-dark rounded-full flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      1200
                    </span>
                    <span className="text-[8px] text-gray-400 uppercase">
                      Kcal
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold block text-gray-900 dark:text-white">
                    Kalan: 800 kcal
                  </span>
                  <span className="text-xs text-gray-500">Hedef: 2000</span>
                </div>
              </div>
            </div>

            {/* 2. Su Takibi */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Su Tüketimi
                </h3>
                <span className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                  1.25 / 2.5 L
                </span>
              </div>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-end gap-3 mb-3">
                  <span className="material-symbols-outlined text-4xl text-blue-500">
                    water_drop
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1 text-gray-500 dark:text-gray-400">
                      <span>%50 Tamamlandı</span>
                    </div>
                    <div className="h-3 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-1/2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  </div>
                </div>
                <button className="w-full py-2 flex items-center justify-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                  250ml Ekle
                </button>
              </div>
            </div>

            {/* 3. Makrolar */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Makrolar
              </h3>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Protein
                    </span>
                    <span className="text-gray-500">80g / 140g</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-orange w-[60%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Karbonhidrat
                    </span>
                    <span className="text-gray-500">120g / 200g</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Yağ
                    </span>
                    <span className="text-gray-500">45g / 70g</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-accent-yellow w-[65%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // --- SPOR MODU SIDEBAR ---
          <div className="flex flex-col gap-5">
            {/* 1. Aktivite Halkası */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Aktivite Özeti
              </h3>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                <div
                  className="relative size-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                  style={{
                    background: `conic-gradient(#f56036 80%, transparent 0)`,
                  }}
                >
                  <div className="absolute inset-1 bg-white dark:bg-surface-dark rounded-full flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      450
                    </span>
                    <span className="text-[8px] text-gray-400 uppercase">
                      Yakılan
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-bold block text-gray-900 dark:text-white">
                    Adım: 8,240
                  </span>
                  <span className="text-xs text-gray-500">Hedef: 10,000</span>
                </div>
              </div>
            </div>

            {/* 2. Sıradaki Antrenman (YENİ) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Sıradaki Antrenman
                </h3>
                <span className="text-xs text-gray-400">18:00</span>
              </div>
              <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-accent-orange/50 transition-colors cursor-pointer group">
                <div className="flex gap-4 items-center mb-3">
                  <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-accent-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">
                      fitness_center
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      Üst Vücut Güç
                    </h4>
                    <p className="text-xs text-gray-500">
                      45 dk • Yüksek Yoğunluk
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded">
                    Göğüs
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded">
                    Arka Kol
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded">
                    Omuz
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Haftalık Egzersiz Grafiği */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                Haftalık Performans
              </h3>
              <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-32 flex items-end justify-between gap-1">
                {/* Basit barlar: Pazartesi'den Pazar'a */}
                {[40, 70, 30, 85, 50, 20, 60].map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 w-full h-full justify-end group"
                  >
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        i === 3
                          ? "bg-accent-orange"
                          : "bg-gray-200 dark:bg-gray-700 group-hover:bg-accent-orange/50"
                      }`}
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-gray-400 uppercase font-bold px-1">
                <span>Pt</span>
                <span>Sa</span>
                <span>Ça</span>
                <span>Pe</span>
                <span>Cu</span>
                <span>Ct</span>
                <span>Pz</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

// Chip Button Helper Style (CSS yerine buraya ekledim basitlik için)
const chipBtnClass =
  "px-3 py-1.5 rounded-lg text-xs font-medium border border-transparent transition-colors whitespace-nowrap flex items-center gap-1";
