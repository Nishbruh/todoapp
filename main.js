let todoList = []

window.addEventListener('load', () => {
    document.querySelector("#add-todo").addEventListener('click', () => {
        addTodo();
    });
    document.querySelector("#todo-item").addEventListener('keyup', () => {
        const todo = document.querySelector("#todo-item");
        validateInput(todo);
    })
    document.addEventListener('click', function (e) {

        if (e.target.classList.contains('remove-todo')) {
            let id = parseInt(e.target.getAttribute('data-id'));
            let filterList = todoList.filter(x => x.id !== id);
            todoList = filterList;
            generateList(filterList);
        }
    });

    document.getElementById("get-users").addEventListener('click', function () {

        getusers().then((data) => {
            console.log(data.data);
            generateUsersList(data.data)
        });
    });
});

addTodo = () => {
    const todo = document.querySelector("#todo-item");
    if (!validateInput(todo))
        return;
    let todoItem = {
        "name": todo.value,
        id: todoList.length + 1
    }
    const list = [...todoList, todoItem]
    todoList = list;
    todo.value = "";
    generateList(list)

}

validateInput = (todo) => {
    //this fucntion validate input field
    let isValid = false;
    if (!todo.value) {
        todo.classList.add('is-invalid');
        todo.focus();
        isValid = false;
    } else {
        todo.classList.remove('is-invalid');
        isValid = true;
    };
    return isValid
}

generateList = (todo) => {
    if (!todo.length) {
        document.getElementById("todo-list-heading").innerText = "No todo items"

    } else {

        document.getElementById("todo-list-heading").innerText = "You have " + todoList.length + " items pending";
    }
    const list = todo.map((todo) => {
        return ` <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${todo.name}
                    <span class="badge badge-danger p-2  pull-right remove-todo" data-id="${todo.id}">X</span>
                </li>`;
    });
    document.querySelector("#todo-list").innerHTML = list;
}

generateUsersList = (todo) => {
    if (!todo.length) {
        document.getElementById("todo-list-heading").innerText = "No todo items"

    } else {

        document.getElementById("todo-list-heading").innerText = "You have " + todoList.length + " items pending";
    }
    const list = todo.map((todo) => {
        return ` <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${todo.first_name + ' '+ todo.last_name}
                    <img src="${todo.avatar}" />
                    <span class="badge badge-danger p-2  pull-right remove-todo" data-id="${todo.id}">X</span>
                </li>`;
    });
    document.querySelector("#users-list").innerHTML = list;
}

async function getusers() {
    const response = await fetch("https://reqres.in/api/users?page=1&per_page=3");
    const data = await response.json();
    return data;
}