import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
      <div className="card" style={{ padding: 40, maxWidth: 500, width: '100%', textAlign: 'center', margin: '0 auto' }}>
        <h1 style={{ fontWeight: 700, color: '#fbcf33', marginBottom: 16 }}>
          Healthy &<br />Eating Made<br />Better 🍽️
        </h1>
        <p style={{ color: '#f56036', fontSize: 18, marginBottom: 24 }}>
          Simplify healthy eating with personalized meal plans, recipes, and groceries.
        </p>
        <div style={{ margin: '24px 0', fontSize: 32, color: '#2dce89' }}>🛵 Delivery</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ fontSize: 18, padding: '12px 32px', borderRadius: 8 }} onClick={() => navigate('/login')}>
            Başla →
          </button>
          <button className="btn" style={{ fontSize: 18, padding: '12px 32px', borderRadius: 8, background: 'transparent', color: '#fff', border: '1px solid #fff' }} onClick={() => navigate('/dashboard')}>
            Atla
          </button>
        </div>
      </div>
    </div>
  );
}
