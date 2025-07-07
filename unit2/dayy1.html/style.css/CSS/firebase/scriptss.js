const gallery = document.getElementById("character-gallery");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentPage = 1;
 async function fetchCharacters(page = 1) {
try {
      console.log("Calling API for page:", page);
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();

      console.log("Fetched data:", data);

    
      renderCharacters(data.results);
      nextBtn.disabled = !data.info.next;
      prevBtn.disabled = !data.info.prev;
      console.log("Fetching page", page);

    }
catch (error) {
    console.log("Failed to fetch character:",error);
    
}
}

function renderCharacters(characters) {
     console.log("Rendering characters:", characters); 
     
  gallery.innerHTML = "";

  characters.forEach((char) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="detail.html?id=${char.id}" target="_blank">
        <img src="${char.image}" alt="${char.name}" />
        <h3>${char.name}</h3>
        <p>${char.species}</p>
        <p>Status: ${char.status}</p>
      </a>
    `;
    gallery.appendChild(card);
  });
  console.log("Rendering characters", characters);

}

nextBtn.addEventListener("click", () => {
  currentPage++;
  fetchCharacters(currentPage);
});

prevBtn.addEventListener("click", () => {
  currentPage--;
  fetchCharacters(currentPage);
});

fetchCharacters();