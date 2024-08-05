// src/App.js
import React from 'react';
import './App.css';
import MyComponent from './components/MyComponent'; // Import nowego komponentu

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Moja aplikacja React</h1>
        <MyComponent /> {/* Użyj nowego komponentu */}
      </header>
    </div>
  );
}

export default App;
