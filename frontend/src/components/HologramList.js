import React, { useState, useEffect } from 'react';
import { fetchHolograms } from '../api';

function HologramList() {
  const [holograms, setHolograms] = useState([]);

  useEffect(() => {
    fetchHolograms()
      .then(data => setHolograms(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Hologram List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Superpower</th>
            <th>Extinct Since</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {holograms.map(hologram => (
            <tr key={hologram.id}>
              <td>{hologram.name}</td>
              <td>{hologram.weight}</td>
              <td>{hologram.superpower}</td>
              <td>{hologram.extinct_since}</td>
              <td>
                <a href={`/holograms/${hologram.id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HologramList;
