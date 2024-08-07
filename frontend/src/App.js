import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HologramList from './components/HologramList'; // Poprawny import
import HologramDetail from './components/HologramDetail'; // Poprawny import
import HologramForm from './components/HologramForm'; // Dodaj, jeśli chcesz mieć formularz

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HologramList />} />
        <Route path="/holograms/:id" element={<HologramDetail />} />
        <Route path="/edit/:id" element={<HologramForm />} /> {/* Dodaj, jeśli masz formularz edycji */}
      </Routes>
    </Router>
  );
}

export default App;

