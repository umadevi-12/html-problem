const databaseURL = 'https://your-project-id.firebaseio.com/users.json';

const tableBody = document.getElementById('#user-table tbody');
const errorDiv = document.getElementById('error');

function loadUsers(){
    fetch(databaseURL)
    .then(response => {
        if(!response.ok){
            throw new Error('Failed to fetch data from firebase');
        }
        return response.json();
    })
    .then(data =>{
        tableBody.innerHTML = '';
        if(data){
            Object.values(data).forEach(user =>{
                const row = document.createElement('tr');
                row.innerHTML = `<td> ${user.name}</td><td>${user.email}</td>`;
            })
        }
        else{
            errorDiv.textContent = 'No users found in the database';
        }
    })
    .catch(error =>{
        errorDiv.textContent = error.message;
    });
}