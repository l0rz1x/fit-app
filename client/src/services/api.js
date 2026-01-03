import axios from "axios";

// Backend adresin
const API_URL = "http://localhost:5002";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR ---
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- AUTH & PROFİL (AYNEN KALIYOR) ---
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
    if (response.data.error) throw new Error(response.data.error);

    const token =
      response.data.token || response.data.accessToken || response.data.jwt;
    if (token) {
      localStorage.setItem("userToken", token);
      return response.data;
    } else {
      throw new Error("Token alınamadı.");
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await API.get("/profile/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveUserProfile = async (profileData) => {
  try {
    const response = await API.post("/profile", profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// --- CHAT İŞLEMLERİ (DÜZELTİLEN KISIM) ---

export const getChatHistory = async () => {
  try {
    const [fitnessRes, nutritionRes] = await Promise.allSettled([
      API.get("/chat/history"),
      API.get("/nutritionChat/history"),
    ]);

    let combinedHistory = [];

    if (fitnessRes.status === "fulfilled") {
      const fitnessData = fitnessRes.value.data.map((msg) => ({
        ...msg,
        context: "fitness",
      }));
      combinedHistory = [...combinedHistory, ...fitnessData];
    }

    if (nutritionRes.status === "fulfilled") {
      const nutritionData = nutritionRes.value.data.map((msg) => ({
        ...msg,
        context: "nutrition",
      }));
      combinedHistory = [...combinedHistory, ...nutritionData];
    }

    combinedHistory.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    return combinedHistory;
  } catch (error) {
    console.error("Chat geçmişi hatası:", error);
    return [];
  }
};

// --- KRİTİK DÜZELTME BURADA ---
export const sendMessageToAI = async (message, context) => {
  try {
    let endpoint = "/chat";
    let payload = {}; // Göndereceğimiz veri paketi

    // 1. Eğer mod Beslenme ise:
    if (context === "nutrition") {
      endpoint = "/nutritionChat";
      // Backend burada 'query' istiyor!
      payload = { query: message };
    }
    // 2. Eğer mod Spor ise:
    else {
      endpoint = "/chat";
      // Backend burada 'message' istiyor (ve context)
      payload = { message: message, context: context };
    }

    const response = await API.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error(
      "Mesaj gönderme hatası:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export default API;
