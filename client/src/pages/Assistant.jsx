import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// API Fonksiyonları
import { sendMessageToAI, getChatHistory } from "../services/api";

export default function Assistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("nutrition"); // 'nutrition' veya 'fitness'
  const [userName, setUserName] = useState("Misafir");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Sohbet Geçmişi
  const [chatHistory, setChatHistory] = useState({
    nutrition: [],
    fitness: [],
  });

  // --- 1. SAYFA YÜKLENİNCE: GEÇMİŞİ VE PROFİLİ ÇEK ---
  useEffect(() => {
    // A. Kullanıcı Adını Backend'den Çek
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        console.log("🔑 Token:", token);
        const response = await axios.get("http://localhost:5002/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("👤 Profile Response:", response.data);

        // Önce user.username'i dene
        if (response.data.user && response.data.user.username) {
          console.log(
            "✅ User.username kullanılıyor:",
            response.data.user.username
          );
          setUserName(response.data.user.username);
        }
        // Yoksa profile.fullname'i dene
        else if (response.data.profile && response.data.profile.fullname) {
          console.log(
            "✅ Profile.fullname kullanılıyor:",
            response.data.profile.fullname
          );
          setUserName(response.data.profile.fullname);
        }
      } catch (error) {
        console.error("❌ Kullanıcı profili yükleme hatası:", error);
        // Fallback: localStorage'dan dene
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (parsed.fullname) setUserName(parsed.fullname);
          } catch (e) {}
        }
      }
    };

    fetchUserProfile();

    // B. Chat Geçmişi
    const loadHistory = async () => {
      try {
        const historyData = await getChatHistory();
        console.log("📥 [Geçmiş] Ham Veri:", historyData);

        const nutritionMsgs = [];
        const fitnessMsgs = [];

        if (Array.isArray(historyData)) {
          historyData.forEach((msg) => {
            // Backend'den gelen veriyi UI formatına çevir

            // Tarif kartı verisi var mı?
            let isRecipe = false;
            let recipeData = null;

            // Backend modeline göre recipeCards JSON veya obje olabilir
            if (msg.recipeCards) {
              isRecipe = true;
              recipeData =
                typeof msg.recipeCards === "string"
                  ? JSON.parse(msg.recipeCards)
                  : msg.recipeCards;
            }

            const formattedMsg = {
              id: msg.id || msg._id || Date.now() + Math.random(),
              sender: msg.sender === "user" ? "user" : "ai",
              text: msg.message || msg.text || "",
              time: new Date(msg.createdAt || Date.now()).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              ),

              // TİP BELİRLEME
              type: isRecipe ? "recipe" : "text",

              // TARİF DETAYLARI (Varsa)
              title:
                recipeData?.title || recipeData?.recipe_name || "Özel Tarif",
              image:
                recipeData?.image ||
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
              calories: recipeData?.calories || "???",

              // CONTEXT (Backend'den gelmeli, yoksa varsayılan ata)
              context: msg.context || "fitness",
            };

            // Listelere Dağıt
            const msgContext = formattedMsg.context.toLowerCase();

            if (msgContext === "nutrition" || msgContext === "beslenme") {
              nutritionMsgs.push(formattedMsg);
            } else {
              fitnessMsgs.push(formattedMsg);
            }
          });
        }

        setChatHistory({
          nutrition: nutritionMsgs,
          fitness: fitnessMsgs,
        });
      } catch (error) {
        console.error("❌ Geçmiş yükleme hatası:", error);
      }
    };

    loadHistory();
  }, []);

  // Otomatik Scroll
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, activeTab, isTyping]);

  // --- 2. MESAJ GÖNDERME ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const now = new Date();
    const timeString = `${now.getHours()}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // 1. Kullanıcı mesajını ekle
    const newUserMsg = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      time: timeString,
    };

    setChatHistory((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newUserMsg],
    }));

    const messageToSend = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      console.log(`🚀 [İstek] ${activeTab}:`, messageToSend);

      // Backend'e gönder (activeTab: 'nutrition' veya 'fitness')
      const response = await sendMessageToAI(messageToSend, activeTab);

      console.log("✅ [Cevap] Backend:", response);

      // Backend cevabını işle
      // NutritionChat route'u: { aiMessage, recipeCards, dietPlan } döner
      // Standart Chat route'u: { message, workout_plan } döner

      let msgType = "text";
      let recipeInfo = {};
      let isPlanCreated = false;

      // A. TARİF VAR MI?
      if (response.recipeCards) {
        msgType = "recipe";
        // Dizi gelirse ilkini al, obje gelirse direkt al
        const card = Array.isArray(response.recipeCards)
          ? response.recipeCards[0]
          : response.recipeCards;
        recipeInfo = {
          title: card.recipe_name || card.title || "Öneri Tarif",
          image:
            card.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
          calories: card.calories || "Belirsiz",
        };
      }

      // B. PLAN OLUŞTU MU?
      if (response.dietPlan || response.workoutPlan || response.workout_plan) {
        isPlanCreated = true;
      }

      // 2. AI mesajını oluştur
      const newAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.aiMessage || response.message || "Cevap yok.",
        time: timeString,
        type: msgType,
        ...recipeInfo, // recipeInfo içindeki title, image, calories buraya yayılır
        isPlanCreated: isPlanCreated, // UI'da "Plan Kaydedildi" rozeti göstermek için
      };

      setChatHistory((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newAiMsg],
      }));
    } catch (error) {
      console.error("❌ Hata:", error);
      const errorMsg = {
        id: Date.now() + 2,
        sender: "ai",
        text: "⚠️ Bağlantı hatası veya sunucu yanıt vermedi.",
        time: timeString,
        type: "text",
      };
      setChatHistory((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], errorMsg],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const currentMessages = chatHistory[activeTab];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark font-display">
      {/* --- SOL MENU (DESKTOP) --- */}
      <aside className="w-[280px] bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col shrink-0 h-full hidden md:flex">
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Mod Seçimi */}
          <div className="flex flex-col gap-1 mb-6">
            <p className="px-3 text-xs font-semibold text-subtle-light dark:text-subtle-dark uppercase tracking-wider mb-2">
              Modlar
            </p>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-all ${
                activeTab === "nutrition"
                  ? "bg-primary/10 text-primary font-bold ring-1 ring-primary/20"
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-text-light dark:text-text-dark"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  activeTab === "nutrition" ? "fill-1" : ""
                }`}
              >
                restaurant_menu
              </span>
              <span className="text-sm">Yemek Asistanı</span>
            </button>

            <button
              onClick={() => setActiveTab("fitness")}
              className={`flex items-center cursor-pointer gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-all ${
                activeTab === "fitness"
                  ? "bg-orange-500/10 text-orange-500 font-bold ring-1 ring-orange-500/20"
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-text-light dark:text-text-dark"
              }`}
            >
              <span
                className={`material-symbols-outlined ${
                  activeTab === "fitness" ? "fill-1" : ""
                }`}
              >
                fitness_center
              </span>
              <span className="text-sm">Spor Koçu</span>
            </button>
          </div>

          {/* Hızlı Linkler */}
          <div className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold text-subtle-light dark:text-subtle-dark uppercase tracking-wider mb-2">
              Programlarım
            </p>
            <button
              onClick={() => navigate("/mealplan")}
              className="px-3 py-2 text-sm cursor-pointer text-text-light dark:text-text-dark hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors text-left"
            >
              🥗 Beslenme Planım
            </button>
            <button
              onClick={() => navigate("/workout")}
              className="px-3 py-2 text-sm cursor-pointer text-text-light dark:text-text-dark hover:text-orange-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors text-left"
            >
              💪 Antrenman Programım
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-3 py-2 text-sm cursor-pointer text-text-light dark:text-text-dark hover:text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors text-left"
            >
              📊 Genel Durum (Dashboard)
            </button>
          </div>
        </nav>

        {/* Profil Kısmı */}
        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-light dark:text-text-dark">
                {userName}
              </span>
              <span className="text-xs text-subtle-light dark:text-subtle-dark">
                Online
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ANA CHAT ALANI --- */}
      <main className="flex-1 flex flex-col h-full relative bg-background-light dark:bg-background-dark">
        {/* Header */}
        <div
          className={`flex items-center gap-3 px-6 py-3 border-b border-border-light dark:border-border-dark backdrop-blur-sm sticky top-0 z-10 
            ${
              activeTab === "nutrition"
                ? "bg-background-light/90 dark:bg-background-dark/90"
                : "bg-background-light/90 dark:bg-background-dark/90"
            }`}
        >
          <div
            className={`p-2 rounded-lg ${
              activeTab === "nutrition"
                ? "bg-primary/10 text-primary"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            <span className="material-symbols-outlined">
              {activeTab === "nutrition" ? "restaurant" : "directions_run"}
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-text-light dark:text-text-dark">
              {activeTab === "nutrition" ? "Beslenme Asistanı" : "Spor Koçu"}
            </h2>
            <p className="text-xs text-subtle-light dark:text-subtle-dark">
              {activeTab === "nutrition"
                ? "Yapay Zeka Destekli Diyetisyen"
                : "Kişisel Antrenör"}
            </p>
          </div>
        </div>

        {/* Mesaj Listesi */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-48">
          {currentMessages.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-subtle-light dark:text-subtle-dark gap-2">
              <span className="material-symbols-outlined text-5xl opacity-50">
                chat_bubble
              </span>
              <p>Henüz mesaj yok. Bir şeyler sorarak başla!</p>
            </div>
          )}

          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-3xl ${
                msg.sender === "user" ? "ml-auto justify-end" : ""
              }`}
            >
              {/* AI Avatar */}
              {msg.sender === "ai" && (
                <div
                  className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm 
                    ${
                      activeTab === "nutrition" ? "bg-primary" : "bg-orange-500"
                    }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    smart_toy
                  </span>
                </div>
              )}

              <div
                className={`flex flex-col gap-2 flex-1 ${
                  msg.sender === "user" ? "items-end" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-light dark:text-text-dark">
                    {msg.sender === "ai" ? "Asistan" : "Sen"}
                  </span>
                  <span className="text-xs text-subtle-light dark:text-subtle-dark">
                    {msg.time}
                  </span>
                </div>

                {/* --- MESAJ TİPLERİ --- */}

                {/* 1. PLAN OLUŞTURULDU BİLDİRİMİ */}
                {msg.isPlanCreated && (
                  <div
                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-xl flex items-center gap-3 mb-2 w-full max-w-md cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() =>
                      navigate(
                        activeTab === "nutrition" ? "/mealplan" : "/workout"
                      )
                    }
                  >
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full text-blue-600 dark:text-blue-300">
                      <span className="material-symbols-outlined">
                        event_note
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-800 dark:text-blue-200">
                        Yeni Plan Hazır!
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Görüntülemek için tıkla.
                      </p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-blue-500">
                      chevron_right
                    </span>
                  </div>
                )}

                {/* 2. TARİF KARTI (RECIPE CARD) */}
                {msg.type === "recipe" ? (
                  <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm max-w-md w-full">
                    <div
                      className="h-48 bg-gray-200 bg-cover bg-center relative group"
                      style={{ backgroundImage: `url("${msg.image}")` }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-sm text-orange-500">
                          local_fire_department
                        </span>
                        {msg.calories} kcal
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-2">
                        {msg.title}
                      </h3>
                      <p className="text-sm text-subtle-light dark:text-subtle-dark mb-4 line-clamp-2">
                        {msg.text}
                      </p>{" "}
                      {/* Tarifin açıklaması varsa */}
                      <button
                        onClick={() => navigate("/mealplan")}
                        className="w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">
                          restaurant_menu
                        </span>
                        Detaylı İncele
                      </button>
                    </div>
                  </div>
                ) : (
                  // 3. NORMAL MESAJ
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm max-w-xl
                    ${
                      msg.sender === "user"
                        ? `text-white rounded-tr-none ${
                            activeTab === "nutrition"
                              ? "bg-primary"
                              : "bg-orange-500"
                          }`
                        : "bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark rounded-tl-none border border-border-light dark:border-border-dark"
                    }`}
                  >
                    {/* Satır sonlarını düzgün göstermek için whitespace-pre-wrap */}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-3xl animate-fade-in">
              <div
                className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 ${
                  activeTab === "nutrition" ? "bg-primary" : "bg-orange-500"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  smart_toy
                </span>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl rounded-tl-none border border-border-light dark:border-border-dark flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* --- INPUT ALANI --- */}
        <div className="relative bottom-0 left-0 right-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md pt-2 pb-6 px-4 border-t border-transparent z-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {/* Öneri Çipleri */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {activeTab === "nutrition" ? (
                <>
                  <button
                    onClick={() =>
                      setInputMessage("Yüksek proteinli kahvaltı öner")
                    }
                    className="px-3 py-1.5 cursor-pointer rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors whitespace-nowrap"
                  >
                    🥞 Protein Kahvaltı
                  </button>
                  <button
                    onClick={() =>
                      setInputMessage("Bana 2 günlük diyet listesi hazırla")
                    }
                    className="px-3 py-1.5 cursor-pointer rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors whitespace-nowrap"
                  >
                    📅 Plan Oluştur
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setInputMessage("30 dk HIIT antrenmanı")}
                    className="px-3 py-1.5 cursor-pointer rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500/20 transition-colors whitespace-nowrap"
                  >
                    🔥 HIIT
                  </button>
                  <button
                    onClick={() =>
                      setInputMessage("Sırt ağrısı için egzersizler")
                    }
                    className="px-3 py-1.5 cursor-pointer rounded-full text-xs font-medium bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500/20 transition-colors whitespace-nowrap"
                  >
                    🧘‍♂️ Esneme
                  </button>
                </>
              )}
            </div>

            <div className="relative flex items-end gap-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-sm p-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none text-text-light dark:text-text-dark placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-32 text-sm"
                placeholder={
                  activeTab === "nutrition"
                    ? "Bir tarif sor veya diyet planı iste..."
                    : "Antrenman planı veya egzersiz sor..."
                }
                rows="1"
              ></textarea>
              <div className="flex items-center gap-1 pb-1">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 text-white rounded-lg shadow-md transition-all shrink-0 flex items-center justify-center 
                    ${
                      !inputMessage.trim()
                        ? "bg-gray-300 dark:bg-gray-700"
                        : activeTab === "nutrition"
                        ? "bg-primary hover:bg-primary-hover cursor-pointer"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-center text-gray-400">
              Yapay zeka hatalı bilgi verebilir. Sağlık konularında mutlaka
              uzmana danışın.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
