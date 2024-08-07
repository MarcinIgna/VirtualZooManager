import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createHologram, updateHologram, fetchHologramById, deleteHologram } from '../api';
import { toast } from 'react-toastify';

function HologramForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hologram, setHologram] = useState({ name: '', weight: '', superpower: '', extinct_since: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch existing hologram details for editing
      const fetchHologram = async () => {
        try {
          const data = await fetchHologramById(id);
          setHologram(data);
          setIsEditing(true);
        } catch (error) {
          console.error('Error fetching hologram:', error);
          toast.error('Error fetching hologram details.');
        }
      };

      fetchHologram();
    }
  }, [id]);

  const handleChange = (e) => {
    setHologram({ ...hologram, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateHologram(id, hologram);
        toast.success('Hologram updated successfully!');
      } else {
        await createHologram(hologram);
        toast.success('Hologram created successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving hologram:', error);
      toast.error('Error saving hologram.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this hologram?')) {
      try {
        await deleteHologram(id);
        toast.success('Hologram deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting hologram:', error);
        toast.error('Error deleting hologram.');
      }
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Hologram' : 'Add Hologram'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={hologram.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={hologram.weight}
            onChange={handleChange}
            placeholder="e.g., 1000"
          />
        </label>
        <label>
          Superpower:
          <input
            type="text"
            name="superpower"
            value={hologram.superpower}
            onChange={handleChange}
          />
        </label>
        <label>
          Extinct Since:
          <input
            type="text"
            name="extinct_since"
            value={hologram.extinct_since}
            onChange={handleChange}
            placeholder="e.g., 6600 BCE"
          />
        </label>
        <button type="submit">
          {isEditing ? 'Update Hologram' : 'Create Hologram'}
        </button>
        {isEditing && (
          <button type="button" onClick={handleDelete}>
            Delete Hologram
          </button>
        )}
      </form>
    </div>
  );
}

export default HologramForm;
