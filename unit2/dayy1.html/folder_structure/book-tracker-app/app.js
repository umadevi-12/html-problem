import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const authSection = document.getElementById('auth-section');
const trackerSection = document.getElementById('tracker-section');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const addBookForm = document.getElementById('add-book-form');
const booksList = document.getElementById('books-list');

let currentUser = null;


onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    authSection.style.display = 'none';
    trackerSection.style.display = 'block';
    loadBooks();
  } else {
    authSection.style.display = 'block';
    trackerSection.style.display = 'none';
  }
});


signupBtn.onclick = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .catch(e => alert(e.message));
};


loginBtn.onclick = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .catch(e => alert(e.message));
};


logoutBtn.onclick = () => signOut(auth);

addBookForm.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, author, userId: currentUser.uid }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  renderBook(data);
  addBookForm.reset();
};

async function loadBooks() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const books = await res.json();
  booksList.innerHTML = '';
  books.slice(0, 10).forEach(book => renderBook(book)); 
}


function renderBook(book) {
  const div = document.createElement('div');
  div.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <button onclick="this.parentElement.remove()">❌ Remove</button>
  `;
  booksList.appendChild(div);
}
