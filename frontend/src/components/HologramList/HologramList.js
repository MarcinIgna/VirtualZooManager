import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHolograms } from '../../api';
import './HologramList.css'; 

function HologramList() {
  const [holograms, setHolograms] = useState([]); // State to store holograms data
  const [filter, setFilter] = useState(''); // State for filter input
  const [sortField, setSortField] = useState('name'); // State for sorting field
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

  useEffect(() => {
    // Fetch holograms data from the API and update state
    const fetchData = async () => {
      try {
        const data = await fetchHolograms();
        setHolograms(data);
      } catch (error) {
        console.error('Error fetching holograms:', error);
      }
    };

    fetchData();
  }, []); // Run once

  // Update filter state based on user input
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Set sorting field and toggle sort order
  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Convert 'extinct_since' field to a numerical value for sorting
  const getDateAsNumber = (date) => {
    const match = date.match(/^(\d+) (BCE|CE)$/);
    if (match) {
      const year = parseInt(match[1], 10);
      const era = match[2];
      return era === 'BCE' ? -year : year;
    }
    return 0;
  };

  // Filter and sort holograms based on filter input and sort criteria
  const filteredHolograms = holograms
    .filter((hologram) =>
      hologram.name.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.superpower.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.extinct_since.toLowerCase().includes(filter.toLowerCase()) ||
      hologram.weight.toString().toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const aDate = getDateAsNumber(a.extinct_since);
      const bDate = getDateAsNumber(b.extinct_since);

      if (sortField === 'extinct_since') {
        if (aDate < bDate) return sortOrder === 'asc' ? -1 : 1;
        if (aDate > bDate) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      } else {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
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
