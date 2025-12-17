import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa yolu (pathname) her değiştiğinde pencereyi en tepeye (0, 0) kaydır
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Bu bileşen ekrana bir şey çizmez, sadece mantık çalıştırır
}
