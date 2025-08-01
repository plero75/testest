import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '2rem' }}>
    <h1>Dashboard Vincennes</h1>
    <p>Bienvenue sur l'affichage dynamique !</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);