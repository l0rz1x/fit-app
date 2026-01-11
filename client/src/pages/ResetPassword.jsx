import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Şifre Göster/Gizle State'leri
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('Geçersiz Link: Token bulunamadı.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler birbiriyle uyuşmuyor.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5002/auth/reset-password', {
        token: token,
        newPassword: password 
      });

      setMessage('Şifreniz başarıyla güncellendi! Giriş sayfasına yönlendiriliyorsunuz...');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      console.error("Hata Detayı:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Bir hata oluştu. Linkin süresi dolmuş olabilir.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Göz İkonu Bileşeni
  const EyeIcon = ({ isVisible }) => (
    isVisible ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    )
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Şifre Sıfırlama</h2>

        {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded border border-red-100">{error}</div>}
        {message && <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 rounded border border-green-100">{message}</div>}

        {token ? (
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* Şifre Alanı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} 
                  // MAVİ YERİNE YEŞİL: focus:ring-green-500
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pr-12 transition-all"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  // CURSOR POINTER EKLENDİ
                  className="absolute right-3 top-3.5 hover:text-green-700 text-gray-400 transition-colors cursor-pointer"
                >
                  <EyeIcon isVisible={showPassword} />
                </button>
              </div>
            </div>

            {/* Şifre Tekrar Alanı */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre Tekrar</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  // MAVİ YERİNE YEŞİL: focus:ring-green-500
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none pr-12 transition-all"
                  placeholder="******"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  // CURSOR POINTER EKLENDİ
                  className="absolute right-3 top-3.5 hover:text-green-700 text-gray-400 transition-colors cursor-pointer"
                >
                  <EyeIcon isVisible={showConfirmPassword} />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              // BUTON RENGİ VE HOVER EFEKTİ YEŞİL YAPILDI
              // cursor-pointer eklendi
              className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-sm cursor-pointer transition-colors
                ${loading 
                  ? 'bg-green-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                }`}
            >
              {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
            </button>
          </form>
        ) : (
          <div className="text-center text-red-500">Lütfen mailinize gelen linke tekrar tıklayın.</div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;