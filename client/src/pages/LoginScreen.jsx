// client/src/pages/LoginScreen.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// DİKKAT: api dosyan hangi klasördeyse oradan import et.
// Eğer aynı klasördeyse "./api", bir üstteyse "../api"
import { loginUser } from "../services/api";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu eklendi
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Kullanıcı yeni bir şey yazarsa hatayı temizle
    if (error) setError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Backend isteğini yap ve gelen veriyi 'data' değişkenine al
      // (Backend şuna benzer bir şey dönüyor: { accessToken: "...", hasProfile: true, ... })
      const data = await loginUser(formData);

      // 2. Token kontrolü (api.js zaten localStorage'a yazdı ama yine de kontrol edelim)
      const token = localStorage.getItem("userToken") || data.accessToken;

      if (token) {
        console.log("Giriş Başarılı. Sunucu Yanıtı:", data);

        // --- AKILLI YÖNLENDİRME ---
        // Eğer backend 'hasProfile: true' dediyse Dashboard'a,
        // Eğer 'hasProfile: false' dediyse Profil Oluşturma sayfasına git.
        if (data.hasProfile) {
          console.log("✅ Profil daha önce oluşturulmuş -> Dashboard");
          navigate("/dashboard");
        } else {
          console.log("⚠️ Profil henüz yok -> Profil Oluşturma Ekranı");
          navigate("/userprofile");
        }
      } else {
        throw new Error("Giriş başarılı ancak token kaydedilemedi.");
      }
    } catch (err) {
      console.error("Giriş Hatası:", err);
      setError(err.message || "Giriş başarısız! E-posta veya şifre hatalı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <div className="flex h-full min-h-screen grow flex-row">
        {/* Left Pane: Visuals */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-cover bg-center lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-yellow-accent/20 to-orange-accent/30 dark:from-primary/50 dark:via-yellow-accent/40 dark:to-orange-accent/50 backdrop-blur-[1px]"></div>
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover opacity-90"
            role="img"
            aria-label="Healthy lifestyle collage"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084&auto=format&fit=crop')",
            }}
          ></div>
        </div>

        {/* Right Pane: Form */}
        <div className="flex w-full flex-1 items-center justify-center p-4 lg:w-1/2">
          <div className="flex w-full max-w-md flex-col gap-8 px-4 py-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
                >
                  spa
                </span>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark">
                  Akıllı Beslenme
                </h1>
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
                Tekrar hoşgeldiniz
              </h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Hedeflerinize ulaşmaya hazır mısınız?
              </p>
            </div>

            {/* HATA MESAJI KUTUSU */}
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-medium"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col w-full">
                <p className="text-base font-medium pb-2 text-text-light dark:text-text-dark">
                  E-posta 
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                  <div className="flex items-center justify-center pl-4 pr-2 border border-r-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-l-lg text-subtle-light dark:text-subtle-dark">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-none border border-l-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] rounded-r-lg text-base font-normal leading-normal"
                    placeholder="E-postanızı girin"
                  />
                </div>
              </label>

              <label className="flex flex-col w-full">
                <p className="text-base font-medium pb-2 text-text-light dark:text-text-dark">
                  Şifre
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                  <div className="flex items-center justify-center pl-4 pr-2 border border-r-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-l-lg text-subtle-light dark:text-subtle-dark">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-none border-y border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal border-x-0"
                    placeholder="Şifrenizi girin"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="flex items-center justify-center pr-4 pl-2 border border-l-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-r-lg text-subtle-light dark:text-subtle-dark cursor-pointer hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                </div>
              </label>

              <p className="text-sm font-normal leading-normal text-right text-subtle-light dark:text-subtle-dark underline hover:text-primary dark:hover:text-primary cursor-pointer transition-colors">
                Parolanızı mı unuttunuz?
              </p>

              <div className="flex flex-col gap-4 items-center mt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-600 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="truncate">
                    {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                  </span>
                </button>
                <p className="text-sm font-normal leading-normal text-center text-subtle-light dark:text-subtle-dark">
                  Henüz üye değil misiniz?{" "}
                  <Link
                    className="font-bold underline text-primary hover:text-orange-accent transition-colors"
                    to="/register"
                  >
                    Üye ol
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
