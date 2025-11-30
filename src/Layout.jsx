import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Nutrition', path: '/nutrition' },
  { text: 'Fitness', path: '/fitness' },
  { text: 'Profile', path: '/profile' },
  { text: 'AI Assistant', path: '/aiassistant' },
];

export default function Layout() {
  const location = useLocation();
  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem' }}>
          <span className="navbar-brand">Healthy Eating App</span>
          <ul className="navbar-nav" style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.text} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="section" style={{ maxWidth: 800, margin: '0 auto', padding: '48px 0' }}>
        <Outlet />
      </main>
    </div>
  );
}
