'use server';

export async function fetchUsers() {
  const data = fetch('https://www.swapi.tech/api/starships/')
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return data;
}
