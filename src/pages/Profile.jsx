import React from 'react';

export default function Profile() {
  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <div className="card" style={{ padding: 32, textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#f5365c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto' }}>U</div>
        </div>
        <h3 style={{ marginBottom: 8 }}>User Name</h3>
        <span style={{ color: '#fbcf33', fontSize: 16 }}>user@email.com</span>
        <div style={{ marginTop: 16 }}>Simple profile view (read-only)</div>
      </div>
    </div>
  );
}
