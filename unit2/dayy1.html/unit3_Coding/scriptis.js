const form = document.getElementById('student_form');
const tableBody = document.querySelector('#student_table tbody');
const searchInput = document.getElementById('search');
const sortAgeBtn = document.getElementById('sort_age');
const  sortScoreBtn = document.getElementById('sort_score');
const summary = document.getElementsById('summary');

let sudents = [];
let edit = null;
form.addEventListener('submit',function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const batch = document.getElementById('batch').value.trim();
    const age = +document.getElementById('age').value;
    const score = +document.getElementById('score').value;

    if (!name || !batch || age <= 0 || score < 0 || score > 100) {
        alert('Please enter valid details!');
    return;
  }
  const student = { name, batch, age, score };
  if (edit === null) {
    students.push(student);
  } else {
    students[edit] = student;
    edit= null;
  }
  form.reset();
  renderTable();
});
function renderTable() {
  tableBody.innerHTML = '';

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  filtered.forEach((student, index) => {
    const row = document.createElement('tr');
    if (student.score > 80) row.classList.add('highlight');

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.batch}</td>
      <td>${student.age}</td>
      <td>${student.score}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  updateSummary(filtered);
}
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('batch').value = student.batch;
  document.getElementById('age').value = student.age;
  document.getElementById('score').value = student.score;
  edit = index;
}
function deleteStudent(index) {
  students.splice(index, 1);
  renderTable();
}
searchInput.addEventListener('input', renderTable);

sortAgeBtn.addEventListener('click', () => {
  students.sort((a, b) => a.age - b.age);
  renderTable();
});

sortScoreBtn.addEventListener('click', () => {
  students.sort((a, b) => b.score - a.score);
  renderTable();
});
function updateSummary(data) {
  const total = data.length;
  const avg = total > 0 ? (data.reduce((sum, s) => sum + s.score, 0) / total).toFixed(2) : 0;
  summary.textContent = `Total Students: ${total} | Average Score: ${avg}`;
}

