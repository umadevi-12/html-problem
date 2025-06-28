const URL = 'https://your-project-id.firebaseio.com/feedback';

const feedbackForm = document.getElementById('feedbackForm');
const editForm = document.getElementById('editForm');
const feedbackTable = document.getElementById('feedbacktable');
const status = document.getElementById('status');

let currentEdit = null;

feedbackForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    fetch(URL ,{
    method :'POST',
    body:JSON.stringify({username,message})
    })
    .then(()=>{
        feedbackForm.reset();
        
       loadFeedback();
    });
function loadFeedback(){
    fetch(URL )
    .then(res => res.json())
    .then(data =>{
        feedbackTable.innerHTML = '';
        for(let id in data){
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${data[id].username}</td>
        <td>${data[id].message}</td>
        <td>button onclick = editFeedback('${id}','${data[id].username}','${data[id].message}')" >Edit</button></td>
        `;
        feedbackTable.appendChild(row);
        }

    });
}
window.editFeedback = (id,username,message) => {
    currentEdit = id;
    document.getElementById('editusername').value = username;
    document.getElementById('editmessage').value = message;

};
editForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const username = document.getElementById('editUsername').value;
    const message = document.getElementById('editmessage').value;

    fetch(`${URL}/${currentEdit}.json`,{
        method:'PATCh',
        body:JSON.stringify({username,message})
    })
    .then(() =>{
        document.getElementById('editBox').style.display = 'none';
        status.textContent = 'Feedback updated!';
        loadFeedback();
    })
    .catch(() => status.textContent = 'update failed')
});
loadFeedback();
    


})