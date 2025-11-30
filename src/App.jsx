import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Nutrition from './pages/Nutrition'
import Fitness from './pages/Fitness'
import Profile from './pages/Profile'
import AIAssistant from './pages/AIAssistant'
import Layout from './Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aiassistant" element={<AIAssistant />} />
      </Route>
    </Routes>
  )
}
