import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHolograms } from '../../api';
import './HologramList.css'; 

function HologramList() {
  const [holograms, setHolograms] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHolograms();
        setHolograms(data);
      } catch (error) {
        console.error('Error fetching holograms:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredHolograms = holograms
    .filter((hologram) =>
      hologram.name.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.superpower.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.extinct_since.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.weight.toString().toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="container">
      <h1 className="header1">Hologram List</h1>
      <Link to="/holograms/new">
        <button className="button">Add Hologram</button>
      </Link>
      <input
        type="text"
        placeholder="Filter by name, superpower, weight, or extinct since"
        value={filter}
        onChange={handleFilterChange}
      />
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => handleSort('weight')}>
              Weight {sortField === 'weight' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => handleSort('superpower')}>
              Superpower {sortField === 'superpower' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            <th onClick={() => handleSort('extinct_since')}>
              Extinct Since {sortField === 'extinct_since' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHolograms.map((hologram) => (
            <tr key={hologram.id}>
              <td>{hologram.name}</td>
              <td>{hologram.weight} kg</td>
              <td>{hologram.superpower}</td>
              <td>{hologram.extinct_since}</td>
              <td>
                <Link to={`/holograms/${hologram.id}/edit`} className="link">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HologramList;
