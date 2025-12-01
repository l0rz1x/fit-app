import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* SOL - LOGO */}
        <div className="navbar-left">
          <div className="brand-logo"></div>
          <span className="brand-name">Akıllı Beslenme</span>
        </div>

        {/* ORTA - LİNKLER (Manuel olarak yazdık) */}
        <nav className="navbar-center">
          
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Dashboard
          </NavLink>

          <NavLink 
            to="/plans" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Planlar
          </NavLink>

          <NavLink 
            to="/recipes" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Tarifler
          </NavLink>

          <NavLink 
            to="/progress" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            İlerleme
          </NavLink>

        </nav>

        {/* SAĞ - PROFİL & ARAMA */}
        <div className="navbar-right">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Ara..." className="search-input" />
          </div>
          
          <div className="action-items">
            <button className="icon-button">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="profile-avatar">
              <User size={20} color="white" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;