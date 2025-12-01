import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="app-root">
      {/* Üstte her zaman gözükecek navbar */}
      <Navbar />

      {/* Sayfalara göre değişen içerik */}
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
