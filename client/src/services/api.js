import axios from "axios";

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

    // Token isimlendirmesi backend'e göre değişebilir (token, accessToken, jwt vb.)
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
    throw new Error(errorMessage); // Hatayı fırlat ki frontend yakalayabilsin
  }
};

// --- PROFİL İŞLEMLERİ ---

// 1. Profil Verisini Çek (Sayfa yüklenince form dolsun diye)
export const getUserProfile = async () => {
  try {
    // Backend rotan muhtemelen GET /profile veya /profile/me şeklindedir
    // Token sayesinde backend kim olduğunu bilir, ID göndermene gerek kalmaz.
    const response = await API.get("/profile/me");
    return response.data;
  } catch (error) {
    // Eğer profil yoksa 404 dönebilir, bu normaldir.
    console.warn("Profil çekilemedi:", error.response?.data || error.message);
    throw error;
  }
};

// 2. Profili Oluştur veya Güncelle (Formu kaydedince çalışır)
export const saveUserProfile = async (profileData) => {
  try {
    // Backend'de yazdığımız "Upsert" (Varsa güncelle, yoksa oluştur) controller'ına gider.
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

export default API;
