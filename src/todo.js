class TodoList {
  #MY_TODO_LIST = [];
  #currentId = 1;
  #MY_TODO_KEY = "myTodoList";

  addItemToList(theItem) {
    let todoItem = theItem.trim();

    let todoObj = {
      id: this.#currentId++,
      title: todoItem,
      isCompleted: false,
    };

    this.#MY_TODO_LIST.push(todoObj);
    this.persistToDB();
  }

  getTodoList() {
    return [...this.#MY_TODO_LIST];
  }

  findTodoItemById(id) {
    const searchedIndex = this.#MY_TODO_LIST.findIndex((todoItem) => {
      return todoItem.id === id;
    });

    if (searchedIndex === -1) {
      throw new Error("Todo not found");
    }

    return searchedIndex;
  }

  getSingleTodoItem(id) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    return todoItem;
  }

  updateTodoItem(id, theUpdatedValue) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    this.#MY_TODO_LIST[searchedIndex] = { ...todoItem, title: theUpdatedValue };
    this.persistToDB();
  }

  toggleTodoStatus(id) {
    const searchedIndex = this.findTodoItemById(id);
    const todoItem = this.#MY_TODO_LIST[searchedIndex];

    this.#MY_TODO_LIST[searchedIndex] = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };
    this.persistToDB();
  }

  deleteTodoItem(id) {
    const searchedIndex = this.findTodoItemById(id);

    this.#MY_TODO_LIST.splice(searchedIndex, 1);
    this.persistToDB();
  }

  persistToDB() {
    localStorage.setItem(this.#MY_TODO_KEY, JSON.stringify(this.#MY_TODO_LIST));
  }

  fetchTodoFromDB() {
    let fetchedTodoFromDB = localStorage.getItem(this.#MY_TODO_KEY);
    this.#MY_TODO_LIST = JSON.parse(fetchedTodoFromDB);

    if (!Array.isArray(this.#MY_TODO_LIST)) {
      this.#MY_TODO_LIST = [];
    }
  }
}

export default TodoList;
