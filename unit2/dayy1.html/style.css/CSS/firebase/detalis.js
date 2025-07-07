async function getCharacterDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const char = await res.json();

  const container = document.getElementById("character-detail");

  const episodes = char.episode.map(e => e.split('/').pop()).join(', ');

  container.innerHTML = `
    <h2>${char.name}</h2>
    <img src="${char.image}" alt="${char.name}" />
    <p><strong>Status:</strong> ${char.status}</p>
    <p><strong>Species:</strong> ${char.species}</p>
    <p><strong>Type:</strong> ${char.type || "N/A"}</p>
    <p><strong>Gender:</strong> ${char.gender}</p>
    <p><strong>Origin:</strong> ${char.origin.name}</p>
    <p><strong>Current Location:</strong> ${char.location.name}</p>
    <p><strong>Episode Appearances:</strong> ${char.episode.length} episodes (IDs: ${episodes})</p>
  `;
}

getCharacterDetail();