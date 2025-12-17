import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4  lg:px-40 animate-fadeIn">
      {/* --- 404 MAIN CONTENT --- */}
      <div className="layout-content-container flex flex-col max-w-[960px] w-full items-center">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Illustration Area */}
          <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
            {/* Arka plan glow efekti */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent-orange/20 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="flex max-w-[560px] flex-col items-center gap-4">
            <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
              404
            </h1>
            <p className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
              Kayıp Mı Oldun ?
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed max-w-[480px]">
              Görünüşe göre bu sayfa "cheat day" yapıyor. Aradığınız tarifi,
              antrenmanı veya sayfayı bulamadık. Sizi sağlıklı
              alışkanlıklarınıza geri döndürelim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
