import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHolograms } from '../api';

function HologramList() {
  const [holograms, setHolograms] = useState([]);

  useEffect(() => {
    const getHolograms = async () => {
      try {
        const data = await fetchHolograms();
        setHolograms(data);
      } catch (error) {
        console.error('Error fetching holograms:', error);
      }
    };

    getHolograms();
  }, []);

  return (
    <div>
      <h1>Hologram List</h1>
      <Link to="/holograms/new">
        <button>Add Hologram</button>
      </Link>
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
          {holograms.map((hologram) => (
            <tr key={hologram.id}>
              <td>{hologram.name}</td>
              <td>{hologram.weight}</td>
              <td>{hologram.superpower}</td>
              <td>{hologram.extinct_since}</td>
              <td>
                <Link to={`/holograms/${hologram.id}/edit`}>
                  <button>Edit</button>
                </Link>
                {/* Dodaj inne akcje, takie jak "Delete" */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HologramList;
