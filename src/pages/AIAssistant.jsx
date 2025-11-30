import React, { useState } from 'react';

export default function AIAssistant() {
  const [mode, setMode] = useState('nutrition');
  const [messages, setMessages] = useState([
    { id: 1, type: 'assistant', text: 'Merhaba! Ben Nutrition AI asistanınız.' }
  ]);
  const [input, setInput] = useState('');

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text:
          newMode === 'nutrition'
            ? 'Merhaba! Ben Nutrition AI asistanınız.'
            : 'Merhaba! Ben Workout AI asistanınız.'
      }
    ]);
    setInput('');
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, type: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ color: '#fbcf33', fontWeight: 700 }}>AI Assistant</h2>
      <div style={{ marginBottom: 16 }}>
        <select
          value={mode}
          onChange={handleModeChange}
          style={{ padding: '8px 16px', borderRadius: 8, fontSize: 16, border: '1px solid #fbcf33', background: '#222a42', color: '#fff' }}
        >
          <option value="nutrition">Nutrition AI</option>
          <option value="workout">Workout AI</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {messages.map(m => (
          <div
            key={m.id}
            className="card"
            style={{ background: m.type === 'assistant' ? '#222a42' : '#2dce89', color: m.type === 'assistant' ? '#fff' : '#222a42', padding: 16 }}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder={mode === 'nutrition' ? 'Beslenme ile ilgili sorunuz...' : 'Antrenman ile ilgili sorunuz...'}
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', fontSize: 16 }}
        />
        <button className="btn btn-primary" style={{ padding: '0 24px', borderRadius: 8 }} onClick={handleSend}>Gönder</button>
      </div>
    </div>
  );
}
