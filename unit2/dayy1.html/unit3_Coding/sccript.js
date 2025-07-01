const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const TODOS_PER_PAGE = 10;
const TOTAL_TODOS = 200; 
const TOTAL_PAGES = Math.ceil(TOTAL_TODOS / TODOS_PER_PAGE);

const todoContainer = document.getElementById('todo-container');
const paginationContainer = document.getElementById('pagination-container');


async function fetchTodos(page) {
  try {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${TODOS_PER_PAGE}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos.');
    }

    const todos = await response.json();
    renderTodos(todos);
    highlightActivePage(page);
  } catch (error) {
    todoContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}


function renderTodos(todos) {
  todoContainer.innerHTML = '';
  todos.forEach(todo => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.innerHTML = `
      <strong>${todo.title}</strong><br />
      Status: <span class="${todo.completed ? 'completed' : 'not-completed'}">
        ${todo.completed ? 'Completed' : 'Not Completed'}
      </span>
    `;
    todoContainer.appendChild(div);
  });
}


function createPagination() {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.addEventListener('click', () => fetchTodos(i));
    paginationContainer.appendChild(btn);
  }
}


function highlightActivePage(currentPage) {
  const buttons = paginationContainer.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    btn.classList.toggle('active', index + 1 === currentPage);
  });
}


createPagination();
fetchTodos(1);
