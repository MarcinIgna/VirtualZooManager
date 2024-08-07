export const API_URL = 'http://localhost:8000/api/holograms/';

export const fetchHolograms = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
}

export const fetchHologramById = async (id) => {
  const response = await fetch(`${API_URL}${id}/`);
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
}

export function createHologram(hologram) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hologram),
  }).then(response => response.json());
}

export function updateHologram(id, hologram) {
  return fetch(`${API_URL}/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hologram),
  }).then(response => response.json());
}

export function deleteHologram(id) {
  return fetch(`${API_URL}/${id}/`, {
    method: 'DELETE',
  }).then(response => response.status);
}
