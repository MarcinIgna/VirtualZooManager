import React, { useState, useEffect } from 'react';
import { fetchHolograms, createHologram, updateHologram } from '../api';

function HologramForm({ match }) {
  const [hologram, setHologram] = useState({ name: '', weight: '', superpower: '', extinct_since: '' });
  const isEditing = !!match.params.id;

  useEffect(() => {
    if (isEditing) {
      fetchHolograms().then(data => {
        const existingHologram = data.find(h => h.id === parseInt(match.params.id));
        if (existingHologram) setHologram(existingHologram);
      });
    }
  }, [isEditing, match.params.id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setHologram(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) {
      updateHologram(hologram.id, hologram);
    } else {
      createHologram(hologram);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={hologram.name} onChange={handleChange} />
      </label>
      <label>
        Weight:
        <input type="number" name="weight" value={hologram.weight} onChange={handleChange} />
      </label>
      <label>
        Superpower:
        <input type="text" name="superpower" value={hologram.superpower} onChange={handleChange} />
      </label>
      <label>
        Extinct Since:
        <input type="text" name="extinct_since" value={hologram.extinct_since} onChange={handleChange} />
      </label>
      <button type="submit">{isEditing ? 'Update' : 'Add'} Hologram</button>
    </form>
  );
}

export default HologramForm;
