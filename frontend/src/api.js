const API_URL = 'http://localhost:8000/api/holograms/';

export const fetchHolograms = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const fetchHologramById = async id => {
  const response = await fetch(`${API_URL}${id}/`);
  return await response.json();
};

export const createHologram = async hologram => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hologram)
  });
  return await response.json();
};

export const updateHologram = async (id, hologram) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hologram)
  });
  return await response.json();
};

export const deleteHologram = async id => {
  await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
};
