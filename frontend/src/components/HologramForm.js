import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createHologram, updateHologram, fetchHologramById } from '../api'; // Importuj funkcje zamiast API_URL

function HologramForm() {
  const [hologram, setHologram] = useState({ name: '', weight: '', superpower: '', extinct_since: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchHologramById(id)
        .then(data => {
          setHologram(data);
          setIsEditing(true);
        })
        .catch(error => console.error('Error fetching hologram:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHologram(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateHologram(id, hologram)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating hologram:', error));
    } else {
      createHologram(hologram)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating hologram:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={hologram.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="weight"
        value={hologram.weight}
        onChange={handleChange}
        placeholder="Weight"
        required
      />
      <input
        type="text"
        name="superpower"
        value={hologram.superpower}
        onChange={handleChange}
        placeholder="Superpower"
        required
      />
      <input
        type="text"
        name="extinct_since"
        value={hologram.extinct_since}
        onChange={handleChange}
        placeholder="Extinct Since"
        required
      />
      <button type="submit">{isEditing ? 'Update' : 'Add'} Hologram</button>
    </form>
  );
}

export default HologramForm;
