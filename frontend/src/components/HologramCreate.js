import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHologram } from '../api';

function HologramCreate() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [extinctSince, setExtinctSince] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newHologram = {
      name,
      weight,
      superpower,
      extinct_since: extinctSince,
    };

    try {
      await createHologram(newHologram);
      navigate('/');
    } catch (error) {
      console.error('Error creating hologram:', error);
    }
  };

  return (
    <div>
      <h1>Add New Hologram</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Weight:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div>
          <label>Superpower:</label>
          <input type="text" value={superpower} onChange={(e) => setSuperpower(e.target.value)} />
        </div>
        <div>
          <label>Extinct Since:</label>
          <input type="text" value={extinctSince} onChange={(e) => setExtinctSince(e.target.value)} />
        </div>
        <button type="submit">Create Hologram</button>
      </form>
    </div>
  );
}

export default HologramCreate;
