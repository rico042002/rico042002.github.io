var todoList = {
  todos: [],
  addTodo: function(todoText) { // addTodo('hi')
    this.todos.push({ // .push an object
      todoText: todoText + "  ", // 'hi'
      completed: false
    });
  },
  changeTodo: function (position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function () {
   var totalTodos = this.todos.length;
   var completedTodos = 0;
   
   //Get number of completed todo.
    this.todos.forEach(function(todo) {
     if(todo.completed === true) {
       completedTodos++;
     }
   });
    
    this.todos.forEach(function(todo) {
      //Case 1: if everything is true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      //Case 2: Otherwise, make everything true.
      } else {
        todo.completed = true;
      }
    });
  }
}; 

var handlers = {
  addTodo: function () {
    var addTodoTextInput = document.getElementById('addTodoText');
    todoList.addTodo(addTodoTextInput.value); //saves text typed from DOM
    addTodoTextInput.value = ''; //clears input after execution
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
   toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
     var todosUl = document.querySelector('ul');
     todosUl.innerHTML = '';
  
    todoList.todos.forEach(function(todo, position) {
     var todoLi = document.createElement('li');
     var todoTextDone = '';
      
      if (todo.completed === true) {
        todoTextDone = '<i class="fa fa-check-square" aria-hidden="true"></i>' + todo.todoText; 
      } else {
        todoTextDone = '<i class="fa fa-square" aria-hidden="true"></i>' + todo.todoText;
      }
    
    todoLi.id = position;
    todoLi.innerHTML = todoTextDone;  //todoLi.textContent = todoTextDone;
    todoLi.appendChild(this.createDeleteButton());
    todosUl.appendChild(todoLi);
    }, this); // passes view object
  },
   createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setupEventListeners: function () { //event delegation
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
    //get element that was clicked on
    var elementClicked = event.target;
  
    //check if element clicked is a delete button
    if (elementClicked.className === 'deleteButton') {
     handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setupEventListeners();
