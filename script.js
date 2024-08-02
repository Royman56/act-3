// Modelo
class TaskModel {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    getTasks() {
        return this.tasks;
    }
}

// Vista
class TaskView {
    constructor() {
        this.taskListElement = document.getElementById('taskList');
        this.taskInputElement = document.getElementById('taskInput');
        this.addTaskButtonElement = document.getElementById('addTaskButton');
    }

    getTaskInput() {
        return this.taskInputElement.value;
    }

    clearTaskInput() {
        this.taskInputElement.value = '';
    }

    displayTasks(tasks) {
        this.taskListElement.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                this.onDeleteTask(index);
            });

            li.appendChild(deleteButton);
            this.taskListElement.appendChild(li);
        });
    }

    onAddTask(handler) {
        this.addTaskButtonElement.addEventListener('click', () => {
            const task = this.getTaskInput();
            if (task) {
                handler(task);
                this.clearTaskInput();
            }
        });
    }

    onDeleteTask(handler) {
        this.onDeleteTask = handler;
    }
}

// Controlador
class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.onAddTask(this.handleAddTask.bind(this));
        this.view.onDeleteTask(this.handleDeleteTask.bind(this));

        this.updateView();
    }

    handleAddTask(task) {
        this.model.addTask(task);
        this.updateView();
    }

    handleDeleteTask(index) {
        this.model.removeTask(index);
        this.updateView();
    }

    updateView() {
        this.view.displayTasks(this.model.getTasks());
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const model = new TaskModel();
    const view = new TaskView();
    const controller = new TaskController(model, view);
});
