import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HologramList() {
  const [holograms, setHolograms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/holograms/')
      .then(response => response.json())
      .then(data => setHolograms(data));
  }, []);

  return (
    <div>
      <h1>Hologramy</h1>
      <ul>
        {holograms.map(hologram => (
          <li key={hologram.id}>
            <Link to={`/holograms/${hologram.id}`}>{hologram.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HologramList;
