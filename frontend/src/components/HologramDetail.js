import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHologramById } from '../api';

const HologramDetail = () => {
  const { id } = useParams();
  const [hologram, setHologram] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHologram = async () => {
      try {
        const data = await fetchHologramById(id);
        setHologram(data);
      } catch (err) {
        setError('Error fetching data');
      }
    };

    getHologram();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!hologram) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{hologram.name}</h1>
      <p>Weight: {hologram.weight}</p>
      <p>Superpower: {hologram.superpower}</p>
      <p>Extinct Since: {hologram.extinct_since}</p>
    </div>
  );
};

export default HologramDetail;
