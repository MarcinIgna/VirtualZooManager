import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHolograms } from '../../api';
import './HologramList.css'; 

function HologramList() {
  // State to store the list of holograms, filter text, sort field, and sort order
  const [holograms, setHolograms] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch holograms data from API when the component mounts
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

  // Update filter state as the user types in the filter input
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Change sorting field and toggle sort order (ascending/descending)
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filter and sort holograms based on user input
  const filteredHolograms = holograms
    .filter((hologram) =>
      hologram.name.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.superpower.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className="container">
      {/* Heading for the hologram list page */}
      <h1 className="header">Hologram List</h1>

      {/* Link to navigate to the form for adding a new hologram */}
      <Link to="/holograms/new">
        <button className="button">Add Hologram</button>
      </Link>

      {/* Input field for filtering holograms */}
      <input
        type="text"
        placeholder="Filter by name or superpower"
        value={filter}
        onChange={handleFilterChange}
      />

      {/* Table to display the list of holograms */}
      <table className="table">
        <thead>
          <tr>
            {/* Header for the Name column with sorting functionality */}
            <th onClick={() => handleSort('name')}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            {/* Header for the Weight column with sorting functionality */}
            <th onClick={() => handleSort('weight')}>
              Weight {sortField === 'weight' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            {/* Header for the Superpower column with sorting functionality */}
            <th onClick={() => handleSort('superpower')}>
              Superpower {sortField === 'superpower' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            {/* Header for the Extinct Since column with sorting functionality */}
            <th onClick={() => handleSort('extinct_since')}>
              Extinct Since {sortField === 'extinct_since' ? (sortOrder === 'asc' ? '🔼' : '🔽') : ''}
            </th>
            {/* Header for Actions column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each hologram in a table row */}
          {filteredHolograms.map((hologram) => (
            <tr key={hologram.id}>
              <td>{hologram.name}</td>
              <td>{hologram.weight}</td>
              <td>{hologram.superpower}</td>
              <td>{hologram.extinct_since}</td>
              {/* Link to edit the hologram */}
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
