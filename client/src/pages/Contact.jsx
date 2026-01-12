import React, { useState } from "react";
import axios from "axios"; // Axios'u import etmeyi unutma

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Yükleniyor durumu ekleyelim (Butona basıldığında kullanıcı anlasın)
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Yükleniyor durumunu başlat

    try {
      // Backend adresini kendi portuna göre ayarla (örneğin localhost:5000/api/contact)
      const response = await axios.post("http://localhost:5002/auth/contact", formData);

      if (response.data.success) {
        alert("Mesajınız başarıyla gönderildi! En kısa sürede döneceğiz.");
        // Formu temizle
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false); // İşlem bitince yükleniyor durumunu kapat
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-200 font-display">
      <div className="flex flex-col min-h-screen">
        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="w-full max-w-[1200px] bg-surface-light dark:bg-surface-dark rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-border-light dark:border-border-dark flex flex-col lg:flex-row min-h-[700px]">
            {/* Left Side: Visual/Branding */}
            <div className="relative w-full lg:w-5/12 bg-gray-50 dark:bg-gray-900 overflow-hidden flex flex-col p-8 lg:p-12 justify-between">
              {/* Decorative Background Image */}
              <div className="absolute inset-0 z-0 opacity-90">
                <img
                  alt="Fresh green salad ingredients flatlay"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 flex flex-col h-full justify-between text-white">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold mb-6 w-fit">
                    <span className="w-2 h-2 rounded-full bg-accent-orange"></span>
                    24/7 Support
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                    Hedeflerinize birlikte ulaşalım.
                  </h1>
                  <p className="text-gray-200 text-lg max-w-sm leading-relaxed">
                    İster makrolarınızı takip ediyor olun, ister maraton koşmayı planlıyor olun; beslenme yolculuğunuzu en iyi hale getirmek için buradayız.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <div className="bg-accent-yellow/20 p-2 rounded-lg text-accent-yellow">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">
                        Bize doğrudan ulaşın
                      </p>
                      <p className="font-semibold text-white">
                        fitnutrition787@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-7/12 p-8 lg:p-14 flex flex-col justify-center bg-surface-light dark:bg-surface-dark">
              <div className="max-w-lg w-full mx-auto">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-text-main-light dark:text-text-main-dark mb-2 tracking-tight">
                    İletişime geçin
                  </h2>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    Planınızla ilgili sorularınız mı var? Ekibimiz genellikle 24 saat içinde yanıt verir.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-text-main-light dark:text-text-main-dark"
                        htmlFor="fullName"
                      >
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
                          <span className="material-symbols-outlined text-[20px]">
                            person
                          </span>
                        </div>
                        <input
                          className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border border-input-border dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-text-main-light dark:text-text-main-dark"
                          id="fullName"
                          placeholder="Jane Doe"
                          type="text"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-text-main-light dark:text-text-main-dark"
                        htmlFor="email"
                      >
                        E-posta adresi
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
                          <span className="material-symbols-outlined text-[20px]">
                            alternate_email
                          </span>
                        </div>
                        <input
                          className="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border border-input-border dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-text-main-light dark:text-text-main-dark"
                          id="email"
                          placeholder="jane@example.com"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-semibold text-text-main-light dark:text-text-main-dark"
                      htmlFor="subject"
                    >
                      Konu
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-[20px]">
                          topic
                        </span>
                      </div>
                      <select
                        className="w-full pl-10 pr-10 py-3 bg-background-light dark:bg-background-dark border border-input-border dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-all text-text-main-light dark:text-text-main-dark appearance-none cursor-pointer"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="">
                          Bir konu seçiniz
                        </option>
                        <option value="Workout Planı Sorgulama">Workout Planı Sorgulama</option>
                        <option value="Beslenme Planı Sorgulama">Beslenme Planı Sorgulama</option>
                        <option value="Teknik Destek">Teknik Destek</option>
                        <option value="Abonelik ve Ücretlendirme">Abonelik ve Ücretlendirme</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="material-symbols-outlined text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-semibold text-text-main-light dark:text-text-main-dark"
                      htmlFor="message"
                    >
                      Nasıl yardımcı olabiliriz?
                    </label>
                    <textarea
                      className="w-full p-4 bg-background-light dark:bg-background-dark border border-input-border dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-primary dark:focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-text-main-light dark:text-text-main-dark resize-none"
                      id="message"
                      placeholder="Mesajınızı buraya yazın..."
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="group w-full bg-primary hover:bg-primary-hover cursor-pointer text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
                    {!loading && (
                      <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    )}
                  </button>
                </form>

                {/* Mobile Footer Links */}
                <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-center lg:hidden">
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    Smart Nutrition & Fitness Planner © 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
          <p className="opacity-60">© 2026 Smart Nutrition. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}