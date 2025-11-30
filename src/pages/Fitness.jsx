import React from 'react';

const workouts = [
  { name: 'Cardio', desc: '30 min running' },
  { name: 'Strength', desc: 'Push-ups, Squats, Lunges' },
  { name: 'Flexibility', desc: 'Yoga, Stretching' },
];

export default function Fitness() {
  return (
    <div>
      <h2 style={{ color: '#fbcf33', fontWeight: 700 }}>Fitness Programs</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 32 }}>
        {workouts.map((w) => (
          <div className="card" key={w.name} style={{ flex: '1 1 220px', minWidth: 180, padding: 24 }}>
            <h4>{w.name}</h4>
            <span>{w.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
