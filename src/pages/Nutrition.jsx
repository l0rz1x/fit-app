import React from 'react';

export default function Nutrition() {
  return (
    <div>
      <h2 style={{ color: '#fbcf33', fontWeight: 700 }}>Nutrition</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 32 }}>
        <div className="card" style={{ flex: '1 1 220px', minWidth: 180, padding: 24 }}>
          <h4>Breakfast</h4>
          <span>Oatmeal, Banana, Almonds</span>
        </div>
        <div className="card" style={{ flex: '1 1 220px', minWidth: 180, padding: 24 }}>
          <h4>Lunch</h4>
          <span>Grilled Chicken, Quinoa, Salad</span>
        </div>
        <div className="card" style={{ flex: '1 1 220px', minWidth: 180, padding: 24 }}>
          <h4>Dinner</h4>
          <span>Salmon, Brown Rice, Broccoli</span>
        </div>
      </div>
    </div>
  );
}
