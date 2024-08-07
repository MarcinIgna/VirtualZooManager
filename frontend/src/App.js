import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HologramList from './components/HologramList'; // Komponent wyświetlający listę hologramów
import HologramDetail from './components/HologramDetail'; // Komponent wyświetlający szczegóły hologramu
import HologramForm from './components/HologramForm'; // Komponent dodający nowy hologram

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HologramList />} />
        <Route path="/holograms/:id" element={<HologramDetail />} />
        <Route path="/add-hologram" element={<HologramForm />} />
      </Routes>
    </Router>
  );
}

export default App;
