/**
 * UI Functionalities
 */

import TodoList from "./todo.js";

const productsTodoList = new TodoList();

const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoItemsContainer = document.getElementById("todo-items");

productsTodoList.fetchTodoFromDB();

updateUIWithTodoList();

// Submit button
todoButton.addEventListener("click", function (event) {
  // get the input value
  const inputValue = todoInput.value;

  // we'll check if its valid(empty or not, at least 5 characters)
  if (inputValue.length < 5) {
    alert("Todo Item must be more that 5 characters");
    return;
  }

  // add it to the todo list array
  productsTodoList.addItemToList(inputValue);

  // clear our input
  todoInput.value = "";

  // loop over it and display it to the UI
  updateUIWithTodoList();
});

// Event that happens when a checkbox is checked
function handleCheckbox(event) {
  const checkbox = event.target;
  const todoId = parseInt(checkbox.dataset.id); // convert string to int
  const todoStatus = checkbox.checked;

  try {
    productsTodoList.toggleTodoStatus(todoId);
    updateUIWithTodoList();
  } catch (error) {
    alert(error.message);
  }
}

// Event that triggers when delete icon is clicked
function handleDelete(event) {
  const canDelete = confirm("Are you sure you want to delete this task?");

  const todoId = parseInt(event.target.dataset.id);

  if (canDelete) {
    productsTodoList.deleteTodoItem(todoId);
    updateUIWithTodoList();
  }
}

// Event that triggers when Edit button is clicked
function handleEdit(event) {
  // const canDelete = confirm("Are you sure you want to delete this task?");
  const todoId = parseInt(event.target.dataset.id);
  const editForm = document.getElementById(`edit-form-${todoId}`);

  if (editForm.classList.contains("hidden")) {
    editForm.classList.remove("hidden");
    editForm.classList.add("flex");

    editForm.querySelector("input").focus();
  } else {
    editForm.classList.remove("flex");
    editForm.classList.add("hidden");
  }
}

function handleUpdate(event) {
  const todoId = parseInt(event.target.dataset.id);
  const updateInput = document.getElementById(`update-input-${todoId}`).value;

  productsTodoList.updateTodoItem(todoId, updateInput);
  updateUIWithTodoList();
}

function buildTodoItemWithHTMLString(todoItem) {
  let todoHTML = `<div id="todo-item relative" class="flex gap-2 align-item-center rounded-md bg-indigo-300 px-3 py-4">
              <input id="checkbox-${todoItem.id}" data-id="${
    todoItem.id
  }" type="checkbox" ${todoItem.isCompleted ? "checked" : ""} />
              <p class="flex-grow ${
                todoItem.isCompleted ? "line-through" : ""
              }">${todoItem.title}</p>
              
              <div id="edit-form-${todoItem.id}" class="hidden gap-2 absolute">
                <input id="update-input-${
                  todoItem.id
                }" type="text" class="h-6" value="${todoItem.title}" />
                <button data-id="${todoItem.id}" id="update-form-${
    todoItem.id
  }" class="px-2 h-6 bg-white rounded text-green-500">✓</button>
              </div>
  
              <div class="flex gap-1">
                <button id="delete-todo-${todoItem.id}" data-id="${
    todoItem.id
  }" class="px-2 h-6 bg-white rounded text-red-500">x</button>
                <button id="edit-todo-${todoItem.id}" data-id="${
    todoItem.id
  }" class="px-2 h-6 bg-blue-500 rounded text-white text-sm" ${
    todoItem.isCompleted ? "disabled" : ""
  }>Edit</button>
              </div>
      </div>`;

  todoItemsContainer.insertAdjacentHTML("beforeend", todoHTML);

  const checkBox = document.getElementById(`checkbox-${todoItem.id}`);
  checkBox.addEventListener("change", handleCheckbox);

  const deleteBtn = document.getElementById(`delete-todo-${todoItem.id}`);
  deleteBtn.addEventListener("click", handleDelete);

  const editBtn = document.getElementById(`edit-todo-${todoItem.id}`);
  editBtn.addEventListener("click", handleEdit);

  const updateBtn = document.getElementById(`update-form-${todoItem.id}`);
  updateBtn.addEventListener("click", handleUpdate);
}

function updateUIWithTodoList() {
  const updatedTodoList = productsTodoList.getTodoList();

  document.getElementById("todo-list-count").innerText = updatedTodoList.length;

  // clear the view
  todoItemsContainer.innerHTML = "";

  // loop over it and display it to the UI
  updatedTodoList.forEach((todoListItem) => {
    buildTodoItemWithHTMLString(todoListItem);
  });

  // const checkBox = document.querySelectorAll(`[type="checkbox"]`);
  // checkBox.forEach((_checkbox) => {
  //     _checkbox.addEventListener('change', handleCheckbox)
  // }
}
