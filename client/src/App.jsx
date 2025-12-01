import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Recipes from "./pages/Recipes";
import Progress from "./pages/Progress";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Şimdilik tüm sayfalar layout ile, yani Navbar ile */}
        <Route element={<MainLayout />}>
       
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
