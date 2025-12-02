import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WelcomeScreen from "./pages/WelcomeScreen";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import MealPlanScreen from "./pages/MealPlanScreen";
import WorkoutScreen from "./pages/WorkoutScreen";

import "./App.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loginscreen" element={<LoginScreen />} />
          <Route path="/registerscreen" element={<RegisterScreen />} />
                    <Route path="/mealplanscreen" element={<MealPlanScreen />} />
                                        <Route path="/workoutscreen" element={<WorkoutScreen />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
