const API_URL = 'https://jsonplaceholder.typicode.com/users';
const LIMIT = 6; 
let currentPage = 1;


const userContainer = document.getElementById('user-container');
const paginationContainer = document.getElementById('pagination-buttons');
const errorMessage = document.getElementById('error-message');

async function fetchUsers(page) {
  try {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);

  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    errorMessage.textContent = '';

    renderUsers(users);
    createPaginationButtons(); 
  } catch (error) {
    errorMessage.textContent = `Failed to load users: ${error.message}`;
    userContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
  }
}


function renderUsers(users) {
  userContainer.innerHTML = ''; 

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <strong>${user.name}</strong><br>
      Email: ${user.email}<br>
      Phone: ${user.phone}<br>
      Company: ${user.company.name}
    `;
    userContainer.appendChild(card);
  });
}

function createPaginationButtons() {
  paginationContainer.innerHTML = ''; 

  const totalUsers = 10; 
  const pageCount = Math.ceil(totalUsers / LIMIT);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = i;
      fetchUsers(currentPage);
    });

    paginationContainer.appendChild(btn);
  }
}


fetchUsers(currentPage);
