import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Yönlendirme için gerekli

const RegisterScreen = () => {
  const navigate = useNavigate(); // Başarılı kayıt sonrası yönlendirme kancası

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // Kullanıcı deneyimi için durumlar
  const [error, setError] = useState(null); // Hata mesajlarını göstermek için
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu için

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Kullanıcı yazı yazmaya başlayınca hatayı temizle
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 1. Temel Doğrulamalar (Frontend Validation)
    if (!formData.email || !formData.password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler birbiriyle eşleşmiyor.");
      return;
    }
    if (!formData.termsAccepted) {
      setError("Devam etmek için şartları kabul etmelisiniz.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. API İsteği
      const response = await fetch("http://localhost:5002/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          // confirmPassword ve termsAccepted genellikle backende gönderilmez
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // BAŞARILI: Kullanıcıyı login sayfasına yönlendir
        console.log("Kayıt Başarılı:", data);
        navigate("/login");
      } else {
        // BAŞARISIZ: Backend'den gelen hatayı göster
        setError(data.message || "Kayıt işlemi başarısız oldu.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError(
        "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı veya sunucuyu kontrol edin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center py-10 lg:py-16">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Column: Image (Desktop Only) */}
            <div className="hidden flex-col items-center justify-center lg:flex">
              <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl dark:shadow-gray-900/50 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div
                  className="aspect-square w-full bg-cover bg-center bg-no-repeat"
                  role="img"
                  aria-label="Healthy food flat lay"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')",
                  }}
                >
                  <div className="w-full h-full bg-black/10 dark:bg-black/20"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex w-full flex-col justify-center">
              <div className="mx-auto w-full max-w-md">
                {/* Title Section */}
                <div className="mb-8 flex flex-col gap-3 text-center lg:text-left">
                  <p className="text-3xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark sm:text-4xl">
                    Akıllı Sağlık Yolculuğunuza Başlayın
                  </p>
                  <p className="text-base font-normal leading-normal text-subtle-light dark:text-subtle-dark">
                    Size özel hazırlanmış beslenme ve fitness planları edinin.
                  </p>
                </div>

                {/* HATA MESAJI KUTUSU */}
                {error && (
                  <div className="mb-4 rounded-lg bg-red-100 border border-red-400 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
                    {error}
                  </div>
                )}

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background-light dark:bg-background-dark px-2 text-subtle-light dark:text-subtle-dark">
                      Başlayın
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">
                      E-posta
                    </p>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary"
                      placeholder="E-posta adresinizi girin"
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">
                      Şifre
                    </p>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary"
                      placeholder="Şifrenizi oluşturun"
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">
                      Şifre Tekrarı
                    </p>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary"
                      placeholder="Şifrenizi onaylayın"
                    />
                  </label>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      id="terms-checkbox"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border-light text-primary focus:ring-primary dark:border-border-dark dark:bg-input-bg-dark"
                    />
                    <label
                      className="text-sm text-subtle-light dark:text-subtle-dark select-none"
                      htmlFor="terms-checkbox"
                    >
                      Kayıt olarak, {" "}
                      <Link
                        className="font-medium text-primary underline hover:text-green-600 transition-colors"
                        to="/terms-of-service"
                        target="_blank"
                      >
                        Hizmet Şartları
                      </Link>{" "}
                      ve{" "}
                      <Link
                        className="font-medium text-primary underline hover:text-green-600 transition-colors"
                        to="/privacy-policy"
                        target="_blank"
                      >
                        Gizlilik Politikası
                      </Link>

                      'nı kabul etmiş olursunuz.
                      .
                    </label>
                  </div>

                  <button
                    disabled={isLoading}
                    className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white shadow-md shadow-primary/20 transition-all hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">
                      {isLoading ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterScreen;
