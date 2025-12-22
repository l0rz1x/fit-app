import axios from "axios";

// Backend adresin (Server.js'de 5002 portunu ayarladığın için burası 5002 kalmalı)
const API_URL = "http://localhost:5002";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR ---
// Her istekte (request) LocalStorage'dan token'ı alıp header'a ekler.
// Bu sayede backend senin "hangi kullanıcı" olduğunu anlar (req.user.id çalışır).
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH İŞLEMLERİ ---

export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);

    // Backend'den gelen veriyi kontrol et
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // Token isimlendirmesi backend'e göre değişebilir
    const token =
      response.data.token || response.data.accessToken || response.data.jwt;

    if (token) {
      localStorage.setItem("userToken", token);
      console.log("✅ Giriş başarılı, Token kaydedildi.");
      return response.data;
    } else {
      throw new Error("Giriş başarısız: Sunucu token göndermedi.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Giriş işlemi sırasında hata oluştu.";
    console.error("Login Hatası:", errorMessage);
    throw new Error(errorMessage);
  }
};

// --- PROFİL İŞLEMLERİ ---

// 1. Profil Verisini Çek
export const getUserProfile = async () => {
  try {
    const response = await API.get("/profile/me");
    return response.data;
  } catch (error) {
    console.warn("Profil çekilemedi:", error.response?.data || error.message);
    throw error;
  }
};

// 2. Profili Oluştur veya Güncelle
export const saveUserProfile = async (profileData) => {
  try {
    const response = await API.post("/profile", profileData);
    return response.data;
  } catch (error) {
    console.error(
      "Profil Kayıt Hatası:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// --- CHAT (AI ASİSTAN) İŞLEMLERİ (YENİ EKLENEN KISIM) ---

// 1. Sohbet Geçmişini Getir
export const getChatHistory = async () => {
  try {
    // Interceptor sayesinde token otomatik gider
    // GET http://localhost:5002/chat/history
    const response = await API.get("/chat/history");
    return response.data;
  } catch (error) {
    console.error(
      "Chat geçmişi hatası:",
      error.response?.data || error.message
    );
    // Hata olsa bile sayfanın patlamaması için boş dizi dönüyoruz
    return [];
  }
};

// 2. Mesaj Gönder
export const sendMessageToAI = async (message, context) => {
  try {
    // POST http://localhost:5002/chat
    // Body: { message: "...", context: "nutrition" }
    const response = await API.post("/chat", {
      message: message,
      context: context,
    });
    return response.data; // Backend'den dönen AI cevabı
  } catch (error) {
    console.error(
      "Mesaj gönderme hatası:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export default API;
