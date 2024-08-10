export const API_URL = 'http://localhost:8000/api/holograms/';

export const fetchHolograms = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const fetchHologramById = async (id) => {
  const response = await fetch(`${API_URL}${id}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const createHologram = async (hologram) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hologram),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const updateHologram = async (id, hologram) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hologram),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const deleteHologram = async (id) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.status; 
};
