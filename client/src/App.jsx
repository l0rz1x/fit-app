import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
