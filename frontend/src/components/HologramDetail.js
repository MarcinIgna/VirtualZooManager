import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function HologramDetail() {
  const [hologram, setHologram] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/holograms/${id}/`)
      .then(response => response.json())
      .then(data => setHologram(data));
  }, [id]);

  if (!hologram) return <p>Loading...</p>;

  return (
    <div>
      <h1>{hologram.name}</h1>
      <p>Waga: {hologram.weight} kg</p>
      <p>Supermoc: {hologram.superpower}</p>
      <p>Wyginęło od: {hologram.extinct_since}</p>
    </div>
  );
}

export default HologramDetail;
