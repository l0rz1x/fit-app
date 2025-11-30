import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
      <div className="card" style={{ padding: 40, maxWidth: 400, width: '100%', textAlign: 'center', margin: '0 auto' }}>
        <h2 style={{ color: '#fbcf33', fontWeight: 700, marginBottom: 16 }}>Let's sign you in</h2>
        <p style={{ color: '#f56036', fontSize: 16, marginBottom: 24 }}>
          Simplify healthy eating with a meal plan tailored to your goals, tastes, and schedule.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          <button className="btn" style={{ background: '#fff', color: '#f5365c', fontWeight: 600, padding: '12px 0', borderRadius: 8 }}>Google ile Giriş</button>
          <button className="btn" style={{ background: '#fff', color: '#2dce89', fontWeight: 600, padding: '12px 0', borderRadius: 8 }}>Apple ile Giriş</button>
          <button className="btn" style={{ background: '#fff', color: '#fbcf33', fontWeight: 600, padding: '12px 0', borderRadius: 8 }}>Facebook ile Giriş</button>
        </div>
        <div style={{ color: '#fff', margin: '16px 0' }}>veya</div>
        <button className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '12px 0', borderRadius: 8 }} onClick={() => navigate('/dashboard')}>Email ile Giriş</button>
        <div style={{ marginTop: 16, color: '#fff', fontSize: 14 }}>
          Hesabınız yok mu?{' '}
          <button className="btn" style={{ background: 'transparent', color: '#fbcf33', border: 'none', fontWeight: 600 }} onClick={() => navigate('/login')}>Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}
