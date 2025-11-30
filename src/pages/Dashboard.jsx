import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h2 style={{ color: '#fbcf33', fontWeight: 700 }}>Home Dashboard</h2>
      <div className="section" style={{ marginTop: 32 }}>
        <h4 style={{ color: '#f56036', fontWeight: 600 }}>My Inventory</h4>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 200px', minWidth: 180, padding: 24 }}>
            <h5>🥚 Eggs</h5>
          </div>
          <div className="card" style={{ flex: '1 1 200px', minWidth: 180, padding: 24 }}>
            <h5>🥬 Spinach</h5>
          </div>
          <div className="card" style={{ flex: '1 1 200px', minWidth: 180, padding: 24 }}>
            <h5>🍅 Tomatoes</h5>
          </div>
        </div>
      </div>
      <div className="section" style={{ marginTop: 32 }}>
        <h4 style={{ color: '#f56036', fontWeight: 600 }}>Today's Meal Plan</h4>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div className="card" style={{ flex: '1 1 300px', minWidth: 220, padding: 24 }}>
            <span>Sample meal cards here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
