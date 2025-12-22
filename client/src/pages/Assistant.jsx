import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// 1. API Fonksiyonlarını Çağırıyoruz
import { sendMessageToAI, getChatHistory } from "../services/api";

export default function Assistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // --- STATE ---
  const [activeTab, setActiveTab] = useState("fitness"); // Varsayılan: Fitness
  const [userName, setUserName] = useState("Misafir");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Sohbet Geçmişi
  const [chatHistory, setChatHistory] = useState({
    nutrition: [],
    fitness: [],
  });

  // --- 2. SAYFA YÜKLENİNCE: GEÇMİŞİ VE PROFİLİ ÇEK ---
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.fullname) setUserName(parsed.fullname);
      } catch (e) {}
    }

    const loadHistory = async () => {
      try {
        const historyData = await getChatHistory();
        console.log("📥 [1] Backend'den Gelen Ham Veri:", historyData);

        const allMessages = [];

        if (Array.isArray(historyData)) {
          historyData.forEach((msg) => {
            const formattedMsg = {
              id: msg._id || msg.id || Date.now() + Math.random(),
              sender:
                msg.role === "user" || msg.sender === "user" ? "user" : "ai",
              text: msg.aiMessage || msg.message || msg.content || "",
              time: new Date(msg.createdAt || Date.now()).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              ),
              type: msg.type || "text",
              title: msg.title,
              image: msg.image,
              calories: msg.calories,
              steps: msg.steps,
              context: msg.context,
            };
            // Hepsini listeye ekliyoruz (Sadece Fitness aktif olduğu için)
            allMessages.push(formattedMsg);
          });
        }

        console.log("💪 [2] Yüklenen Mesajlar:", allMessages);

        setChatHistory({
          nutrition: [],
          fitness: allMessages,
        });
      } catch (error) {
        console.error("❌ Geçmiş yükleme hatası:", error);
      }
    };

    loadHistory();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, activeTab, isTyping]);

  // --- 3. MESAJ GÖNDERME ---
  const handleSendMessage = async () => {
    if (activeTab === "nutrition") {
      alert("Bu özellik yakında aktif olacaktır.");
      return;
    }

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

    setChatHistory((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newUserMsg],
    }));

    const messageToSend = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      console.log("🚀 [3] Mesaj Gönderiliyor:", messageToSend);
      const response = await sendMessageToAI(messageToSend, activeTab);
      console.log("✅ [4] Backend Cevabı:", response);

      const newAiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          response.aiMessage ||
          response.message ||
          response.content ||
          "Cevap yok.",
        time: timeString,
        type: response.type || "text",
        title: response.title,
        image: response.image,
        calories: response.calories,
        steps: response.steps,
      };

      setChatHistory((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newAiMsg],
      }));
    } catch (error) {
      console.error("❌ Mesaj gönderme hatası:", error);
      const errorMsg = {
        id: Date.now() + 2,
        sender: "ai",
        text: "⚠️ Sunucuyla bağlantı kurulamadı.",
        time: timeString,
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
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background-light dark:bg-background-dark">
      {/* SOL SIDEBAR */}
      <aside className="w-[280px] bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0 h-full hidden md:flex transition-all duration-300">
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Mod Seçimi
            </p>
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
            <button
              disabled={true}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left group transition-all opacity-50 cursor-not-allowed hover:bg-transparent text-gray-400"
            >
              <span className="material-symbols-outlined">restaurant_menu</span>
              <span className="text-sm font-bold">
                Yemek Asistanı (Yakında)
              </span>
            </button>
            <button
              onClick={() => setActiveTab("fitness")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left group transition-all ${
                activeTab === "fitness"
                  ? "bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-200"
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
              onClick={() => navigate("/mealplan")}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white truncate block text-left w-full hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              📋 Yemek Planlarım
            </button>
            <button
              onClick={() => navigate("/workout")}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-white truncate block text-left w-full hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              💪 Antrenman Programım
            </button>
          </div>
        </nav>
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

      {/* ANA İÇERİK (CHAT) */}
      <main className="flex-1 flex flex-col h-full relative bg-white dark:bg-background-dark">
        <div
          className={`flex items-center gap-3 px-6 py-3 border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm sticky top-0 z-10 ${
            activeTab === "nutrition" ? "bg-primary/5" : "bg-orange-50/50"
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              activeTab === "nutrition"
                ? "bg-primary/20 text-primary"
                : "bg-orange-100 text-orange-600"
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
                ? "Yakında Hizmetinizde"
                : "Egzersiz, Setler, Kardiyo"}
            </p>
          </div>
        </div>

        {/* MESAJ LİSTESİ */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-48">
          {currentMessages.length === 0 && (
            <div className="text-center text-gray-400 mt-10">
              <p>Henüz mesaj yok. Merhaba diyerek başla! 👋</p>
            </div>
          )}

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
                    {msg.sender === "ai" ? "AI" : "Sen"}
                  </span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>

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
                  // --- DÜZELTME BURADA YAPILDI ---
                  // 'bg-accent-orange' yerine standart 'bg-orange-500' kullanıldı.
                  <div
                    className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? `text-white rounded-tr-none ${
                            activeTab === "nutrition"
                              ? "bg-primary"
                              : "bg-orange-500"
                          }`
                        : "bg-gray-50 dark:bg-surface-dark text-gray-800 dark:text-gray-200 rounded-tl-none border border-transparent dark:border-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div
                  className="size-10 rounded-full bg-cover bg-center shrink-0 shadow-sm border-2 border-white dark:border-gray-700"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop")',
                  }}
                ></div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-3xl">
              <div
                className={`size-10 rounded-full flex items-center justify-center text-white shrink-0 ${
                  activeTab === "nutrition" ? "bg-primary" : "bg-orange-500"
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

        {/* INPUT ALANI */}
        <div className="relative bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md pt-2 pb-6 px-4 border-t border-transparent z-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {activeTab === "fitness" && (
                <>
                  <button
                    onClick={() => setInputMessage("30 dk HIIT kardiyo")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-transparent transition-colors whitespace-nowrap flex items-center gap-1 text-orange-600 bg-orange-50 hover:bg-orange-100"
                  >
                    🔥 HIIT Kardiyo
                  </button>
                  <button
                    onClick={() => setInputMessage("Sırt ağrısı için esneme")}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-transparent transition-colors whitespace-nowrap flex items-center gap-1 text-blue-500 bg-blue-50 hover:bg-blue-100"
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
                placeholder="Antrenman planı veya egzersiz sor..."
                rows="1"
              ></textarea>
              <div className="flex items-center gap-1 pb-1">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 text-white rounded-lg shadow-md transition-all shrink-0 flex items-center justify-center ${
                    !inputMessage.trim()
                      ? "bg-gray-300"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SAĞ SIDEBAR */}
      <aside className="w-[320px] bg-background-subtle dark:bg-background-dark border-l border-gray-200 dark:border-gray-800 hidden xl:flex flex-col shrink-0 overflow-y-auto p-6 gap-6">
        <div className="flex flex-col gap-5">
          {/* Aktivite Özeti */}
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
          {/* Sıradaki Antrenman */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Sıradaki Antrenman
              </h3>
              <span className="text-xs text-gray-400">18:00</span>
            </div>
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-orange-500/50 transition-colors cursor-pointer group">
              <div className="flex gap-4 items-center mb-3">
                <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
          {/* Haftalık Performans */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
              Haftalık Performans
            </h3>
            <div className="bg-white dark:bg-surface-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 h-32 flex items-end justify-between gap-1">
              {[40, 70, 30, 85, 50, 20, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 w-full h-full justify-end group"
                >
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      i === 3
                        ? "bg-orange-500"
                        : "bg-gray-200 dark:bg-gray-700 group-hover:bg-orange-400"
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
      </aside>
    </div>
  );
}
