import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HologramList from './components/HologramList';
import HologramForm from './components/HologramForm';
import HologramDetail from './components/HologramDetail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HologramList />} />
          <Route path="/holograms/new" element={<HologramForm />} />
          <Route path="/holograms/:id/edit" element={<HologramForm />} />
          <Route path="/holograms/:id" element={<HologramDetail />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
