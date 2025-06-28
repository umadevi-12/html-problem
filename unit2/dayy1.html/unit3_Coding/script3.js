const API_URL = 'https://mockapi.io/api/v1/tasks';
const taskList =document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editTitle = document.getElementById('edit-title');
const editStatus = document.getElementById('edit-status');
const CloseModalBtn = document.getElementById('close-modal');

let cuurentEditId = null;

function fetchTasks(){
    fetch(API_URL)
    .then(res => res.json())
    .then(tasks => {
        taskList.innerHTML = '';
        tasks.forEach(task => renderTask(task));
    })
    .catch(err => alert('Failed to fetch tasks:' + err.message));
}
function renderTask(task){
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
    <span> ${task.title} - <strong>${task.status}</strong></span>
    <div>
    <button onclick = "openEditModal('${task.id}','${task.title}','${task.status}')">Edit</button>
    <button onclick = "deleteTask('${task.id}')>Delete</button>
    </div>
    `;
    taskList.appendChild(li);
}

function openEditModal(id,tile,status){
    cuurentEditId = id;
    editTitle.value = title;
    editStatus.value = status;
    editModal.classList.remove('hidden');

}

editForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const updateTask = {
        title:editTitle.value,
        status:editStatus.value
    };

});
function deleteTask(id){
    if(!confirm('are you sure you want to delete this task'))return;
    fetch(`${API_URL}/${id}`,{
        method:'DELETE'
    })
    .then(res => {
        if(!res.ok) throw new Error('Failed to delete');
        document.querySelector(`li[data-id' = "${id}"]`).remove();
    })
    .catch(err => alert('error deleting task:'+err.message));
}
CloseModalBtn.addEventListener('click',() =>{
    editModal.classList.add('hidden')
});
window.onload = fetchTasks;