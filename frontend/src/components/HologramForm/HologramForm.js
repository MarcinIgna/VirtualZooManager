import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { createHologram, updateHologram, fetchHologramById, deleteHologram } from '../../api';
import { toast } from 'react-toastify';
import './HologramForm.css'; 

function HologramForm() {
  // Retrieve the ID from URL parameters
  const { id } = useParams();
  // Hook for navigation
  const navigate = useNavigate();
  // State to hold hologram data and a flag for editing mode
  const [hologram, setHologram] = useState({ name: '', weight: '', superpower: '', extinct_since: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch hologram data if an ID is present (for editing mode)
  useEffect(() => {
    if (id) {
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

  // Handle capitalization of the first word
  const capitalizeFirstWord = (text) => {
    return text
      .replace(/^[a-z]/, char => char.toUpperCase()) // Capitalize only the first letter of the text
      .replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters except spaces
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let processedValue = value;
  
    // Adjust processing based on the field
    if (name === 'name' || name === 'superpower') {
      // Capitalize the first letter for text fields
      processedValue = capitalizeFirstWord(value);
    } else if (name === 'weight') {
      // Process 'weight' field as a number, removing unwanted characters
      // Allow only digits, do not allow 'e', 'E', or other characters
      processedValue = value.replace(/[^0-9]/g, '');
    } else if (name === 'extinct_since') {
      // Allow a mix of text and numbers, add validation if needed
    }
  
    setHologram({ ...hologram, [name]: processedValue });
  };
  
  // Handle form submission for creating or updating holograms
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

  // Handle deletion of a hologram
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
    <div className="container">
      {/* Display heading based on whether editing or adding a new hologram */}
      <h1 className="header">{isEditing ? 'Edit Hologram' : 'Add Hologram'}</h1>

      {/* Link to navigate back to the main list */}
      <Link to="/">
        <button className="back-button">Back to List</button>
      </Link>

      {/* Form for adding or editing hologram */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={hologram.name}
            onChange={handleChange}
            placeholder='e.g., "Dodo"'
          />
        </label>
        <label>
          Weight:
          <input
            type="text"  
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
            placeholder='e.g., "Flight"'
          />
        </label>
        <label>
          Extinct Since:
          <input
            type="text"
            name="extinct_since"
            value={hologram.extinct_since}
            onChange={handleChange}
            placeholder="e.g., 6600 BCE or 1667 CE"
          />
        </label>
        
        {/* Submit button for form */}
        <button type="submit">
          {isEditing ? 'Update Hologram' : 'Create Hologram'}
        </button>
        
        {/* Delete button is only visible when editing an existing hologram */}
        {isEditing && (
          <button type="button" onClick={handleDelete} className="delete">
            Delete Hologram
          </button>
        )}
      </form>
    </div>
  );
}

export default HologramForm;
