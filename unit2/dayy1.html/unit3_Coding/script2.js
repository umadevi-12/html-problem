const API_URL = 'https://mockapi.io/users';

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

let users = [];
async function fetchUsers() {
    try{
        const res = await fetch(API_URL);
        users = await res.json();
        displayUsers();

    }
    catch(error){
        console.log('Error fetching users:',error);
    }
    
}
function displayUsers(){
    userList.innerHTML = '';
    users.forEach(user =>{
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}
userForm.addEventListener('submit' ,async(e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if(users.some(user=>user.email === email)){
        alert('User with this email already exists!');
        return;
    }
    try{
        const res = await fetch(API_URL,{
        body:JSON.stringify({name,email})
    });
    const newUser = await res.json();
    users.push(newUser);
    displayUsers();
    userForm.reset();
}catch(error){
    console.log('Error adding user',error)

}
});
fetchUsers();
