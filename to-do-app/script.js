const form = document.querySelector(".form");
const input = document.getElementById('input');
const todoUl = document.querySelector('.todos');
const video = document.querySelector('.video')

const todos = JSON.parse(localStorage.getItem('todos'))
if(todos){
  todos.forEach(todo => {
    addToDo(todo)
  })
}



form.addEventListener('submit', e => {
  e.preventDefault();

  addToDo()

})

function addToDo(todo){
  let todoText = input.value;

  if(todo){
    todoText = todo.title
  }



  if(todoText){
    const todoEL = document.createElement('li')
    if(todo && todo.complete){
      todoEL.classList.add('complete')
    }
    todoEL.textContent = todoText;

    todoUl.appendChild(todoEL)

    input.value = ""

    todoEL.addEventListener('click', () => {
      todoEL.classList.toggle('complete')
      updateLS()
    });

    todoEL.addEventListener('contextmenu', e => {
      e.preventDefault();
      todoEL.remove();
      updateLS()
    });
    updateLS()
    
  };
}

function updateLS(){
  const todoEl = document.querySelectorAll('li');

  const todos = [];

  todoEl.forEach(todo => {
    todos.push({
      title: todo.innerText,
      complete: todo.classList.contains('complete') 
    })
  });

  localStorage.setItem('todos', JSON.stringify(todos));

  return todos
}