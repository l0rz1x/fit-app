import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Geri dön butonu için gerekli

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Yükleniyor durumu eklendi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Backend portun 5002 ise burası doğru
      await axios.post("http://localhost:5002/auth/forgot-password", { 
        email: email 
      });
      setMessage("Sıfırlama bağlantısı e-posta adresinize gönderildi! Lütfen spam klasörünüzü de kontrol edin.");
    } catch (err) {
      setError(err.response?.data?.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        
        {/* Başlık ve İkon Kısmı */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            {/* Mail İkonu (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Şifremi Unuttum</h2>
          <p className="mt-2 text-sm text-gray-600">
            E-posta adresinizi girin, size sıfırlama linki gönderelim.
          </p>
        </div>

        {/* Hata Mesajı */}
        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Başarı Mesajı */}
        {message && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label>
            <div className="relative">
              <input
                type="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pl-10 transition-all"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                {/* Küçük Mail İkonu Input İçinde */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-sm cursor-pointer transition-colors
              ${loading 
                ? 'bg-green-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              }`}
          >
            {loading ? 'Gönderiliyor...' : 'Link Gönder'}
          </button>
        </form>

        {/* Giriş Yap Sayfasına Dön Linki */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-green-600 hover:text-green-500 flex items-center justify-center gap-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Giriş sayfasına dön
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;