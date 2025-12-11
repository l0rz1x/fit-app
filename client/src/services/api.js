import axios from "axios";

// DİKKAT: Server terminalinde "Server running on port X" yazısında hangi port varsa onu yaz.
// Veritabanı portun (22122) ile Server portun (5002) farklı olabilir, bu normaldir.
const API_URL = "http://localhost:5002";

// Axios instance oluşturuyoruz (Kod tekrarını önlemek için)
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- REGISTER (KAYIT OL) FONKSİYONU ---
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth", userData);
    return response;
  } catch (error) {
    // Hata detayını fırlat ki ekranda gösterebilelim
    throw error;
  }
};

// --- LOGIN (GİRİŞ YAP) FONKSİYONU ---
export const loginUser = async (formData) => {
  try {
    const response = await API.post("/auth/login", formData);

    // Eğer backend token dönüyorsa kaydet
    if (response.data.token) {
      localStorage.setItem("userToken", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default API;
