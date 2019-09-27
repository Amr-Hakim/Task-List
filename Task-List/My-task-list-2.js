const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const taskClear = document.querySelector('.clear-tasks');
const taskFilter = document.querySelector('#filter');

loadAllEvents();

function loadAllEvents(){
  //add tasks
  taskForm.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  taskBtn.addEventListener('click', clearTasks);
  taskFilter.addEventListener('keyup', filterTasks);
  document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks(e){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
  })
}

function addTask(e){
  if(taskInput.value === ''){
    alert('please add a task');
  }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content'
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';

  
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.classList.contains('fa-remove')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
    
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
  while(taskList.firstChild){
    if(confirm('are you sure?')){
      taskList.removeChild(taskList.firstChild)
    };
  };
  clearTasksFromLS();
}

function clearTasksFromLS(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
    } else {
      task.style.display = 'none'
    }
  })
}