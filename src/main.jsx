import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
    <h1>Bienvenue sur le Dashboard Vincennes</h1>
    <p>Chargement des données en cours...</p>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);