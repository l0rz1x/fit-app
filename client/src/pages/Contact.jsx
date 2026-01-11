import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Gönderildi:", formData);
    // Buraya API isteği (axios.post) gelecek
    alert("Mesajınız alındı!");
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
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" // Kalıcı bir Unsplash görseliyle değiştirdim
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
                    İster makrolarınızı takip ediyor olun, ister maraton koşmayı planlıyor olun; beslenme yolculuğunuzu en iyi hale getirmek için buradayızs
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
                        destek@akillibeslenme.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <a
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 text-white"
                      href="#"
                    >
                      <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                    </a>
                    <a
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 text-white"
                      href="#"
                    >
                      <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                      </svg>
                    </a>
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
                      >
                        <option disabled value="">
                          Bir konu seçiniz
                        </option>
                        <option value="plans">Beslenme Planı Sorgulama</option>
                        <option value="technical">Teknik Destek</option>
                        <option value="billing">Abonelik ve Ücretlendirme</option>
                        <option value="other">Diğer</option>
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
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="group w-full bg-primary hover:bg-primary-hover text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    Mesaj Gönder
                    <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
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

        {/* Footer (Yine global footer varsa silebilirsin) */}
        <footer className="py-6 text-center text-text-secondary-light dark:text-text-secondary-dark text-sm">
          <div className="flex justify-center gap-6 mb-2">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              FAQ
            </a>
          </div>
          <p className="opacity-60">
            © 2024 Smart Nutrition. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
