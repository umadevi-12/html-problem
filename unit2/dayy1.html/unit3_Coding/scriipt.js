const API_URL = "https://jsonplaceholder.typicode.com/users";
const USERS_PER_PAGE = 6;

const userContainer = document.getElementById('user-container');
const paginationContainer = document.getElementById('pagination');
const errorMessage = document.getElementById('error-message');

let currentPage = 1;

async function fetchUsers(page) {
  try {
    errorMessage.textContent = ""; 

    const response = await fetch(`${API_URL}?_page=${page}&_limit=${USERS_PER_PAGE}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    renderUsers(users);
    renderPaginationButtons(page);
  } catch (error) {
    userContainer.innerHTML = '';
    paginationContainer.innerHTML = '';
    errorMessage.textContent = `Failed to fetch users: ${error.message}`;
  }
}

function renderUsers(users) {
  userContainer.innerHTML = '';

  if (users.length === 0) {
    userContainer.innerHTML = '<p>No users found.</p>';
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML = `
      <strong>${user.name}</strong><br>
      Username: ${user.username}<br>
      Email: ${user.email}<br>
      Phone: ${user.phone}<br>
      Company: ${user.company.name}
    `;
    userContainer.appendChild(card);
  });
}


function renderPaginationButtons(current) {
  paginationContainer.innerHTML = '';

  const totalUsers = 10; 
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === current) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      fetchUsers(currentPage);
    });
    paginationContainer.appendChild(btn);
  }
}

fetchUsers(currentPage);
