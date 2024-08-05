import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/holograms/')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Hologramy</h1>
      <ul>
        {data.map(hologram => (
          <li key={hologram.id}>{hologram.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;