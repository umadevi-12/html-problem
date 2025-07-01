
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getFirestore, collection, query, orderBy, where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const novelsRef = collection(db, "novels");


const searchInput = document.getElementById('searchInput');
const yearFilter = document.getElementById('yearFilter');
const sortPrice = document.getElementById('sortPrice');
const novelList = document.getElementById('novelList');


async function loadNovels() {
  novelList.innerHTML = '';
  let q = novelsRef;

  const year = yearFilter.value;
  const sortOrder = sortPrice.value;
  const search = searchInput.value.trim().toLowerCase();


  if (year) {
    q = query(q, where('release_year', '==', Number(year)));
  }


  if (sortOrder === 'asc') {
    q = query(q, orderBy('price', 'asc'));
  } else if (sortOrder === 'desc') {
    q = query(q, orderBy('price', 'desc'));
  }

  try {
    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();

    
      const matchesSearch = search === '' ||
        data.title.toLowerCase().includes(search) ||
        data.author.toLowerCase().includes(search);

      if (matchesSearch) {
        results.push(data);
      }
    });

    if (results.length === 0) {
      novelList.innerHTML = '<tr><td colspan="5">No results found</td></tr>';
      return;
    }

    results.forEach(novel => {
      const row = `<tr>
        <td>${novel.title}</td>
        <td>${novel.author}</td>
        <td>$${novel.price.toFixed(2)}</td>
        <td>${novel.release_year}</td>
        <td>${novel.genre}</td>
      </tr>`;
      novelList.innerHTML += row;
    });

  } catch (err) {
    console.error('Error fetching data:', err);
    novelList.innerHTML = '<tr><td colspan="5">Failed to load novels</td></tr>';
  }
}


searchInput.addEventListener('input', loadNovels);


loadNovels();
