import React from 'react';

function App() {
  return (
    <div className="app-container">
      <header style={{ padding: '1.5rem', background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          🎟️ EventHub
        </h1>
      </header>
      <main className="main-content">
        <h2>Initial Project Setup</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Welcome to the Event Management System. Redux store and React Router setup are ready for initialization.
        </p>
      </main>
    </div>
  );
}

export default App;
