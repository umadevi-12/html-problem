let shows = [];
let currentPage = 1;
const perPage = 6;

async function fetchShows() {
    const res = await fetch("https://api.tvmaze.com/shows");
    shows = await res.json();
    populateGenres(shows);
    renderMovies();
}

function populateGenres(shows){
    const genreSet = new Set();
    shows.forEach(show => show.genres.forEach(g => genreSet.add(g)));

    const genreSelect = document.getElementById('genreFilter');
    genreSet.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
}

function renderMovies(){
    let filtered = [...shows];
    const genre = document.getElementById('genreFilter').value;
    const sort = document.getElementById("sortSelect").value;

    if(genre){
        filtered = filtered.filter(show => show.genres.includes(genre));
    }

    if(sort === 'rating'){
        filtered.sort((a,b) => (b.rating.average || 0) - (a.rating.average || 0));
    } else if(sort === 'title'){
        filtered.sort((a,b) => a.name.localeCompare(b.name));
    }

    const totalPages = Math.ceil(filtered.length / perPage);
    currentPage = Math.min(currentPage, totalPages || 1);
    const start = (currentPage - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = "";
    
    paginated.forEach(show => {
        const div = document.createElement('div');
        div.className = 'movie-card';
        div.innerHTML = `
            <img src="${show.image?.medium}" alt="${show.name}">
            <h3>${show.name}</h3>
            <p>Genres: ${show.genres.join(' ')}</p>
            <p>Rating: ${show.rating.average || "N/A"}</p>
        `;
        grid.appendChild(div);
    });

    const pageNumber = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if(pageNumber) pageNumber.textContent = `Page ${currentPage}`;
    if(prevBtn) prevBtn.disabled = (currentPage === 1);
    if(nextBtn) nextBtn.disabled = (currentPage === totalPages);
}


document.getElementById('prevBtn').addEventListener('click', () => {
    if(currentPage > 1){
        currentPage--;
        renderMovies();
    }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    renderMovies();
});
document.getElementById('genreFilter').addEventListener('change', () => {
    currentPage = 1;
    renderMovies();
});
document.getElementById('sortSelect').addEventListener('change', () => {
    currentPage = 1;
    renderMovies();
});

fetchShows();
