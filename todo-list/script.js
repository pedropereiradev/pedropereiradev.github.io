const savedList = localStorage.getItem("task");

const button = document.querySelector("#criar-tarefa");
const taskList = document.querySelector("#lista-tarefas");
const removeFinalizados = document.querySelector("#remover-finalizados");
const apagaTudo = document.querySelector("#apaga-tudo");
const saveTask = document.querySelector("#salvar-tarefas");
const moveUp = document.querySelector("#mover-cima");
const moveDown = document.querySelector("#mover-baixo");
const clearSelected = document.querySelector("#remover-selecionado");

taskList.innerHTML = savedList;

button.addEventListener("click", () => {
  const inputTask = document.querySelector("#texto-tarefa");

  const task = inputTask.value;
  inputTask.value = "";

  const taskItem = document.createElement("li");
  taskItem.innerText = task;
  taskItem.className = "task";

  taskList.appendChild(taskItem);
});

function removeBackground() {
  const tasks = document.querySelectorAll(".task");

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].className.includes("completed")) {
      tasks[i].className = "task completed";
    } else {
      tasks[i].className = "task";
    }
  }
}

taskList.addEventListener("click", (origin) => {
  removeBackground();

  if (origin.target.className.includes("selected")) {
    if (origin.target.className.includes("completed")) {
      origin.target.className = "task completed";
    } else {
      origin.target.className = "task";
    }
  } else {
    origin.target.className += " selected";
  }
});

taskList.addEventListener("dblclick", (origin) => {
  if (origin.target.className.includes("completed")) {
    origin.target.className = "task";
  } else {
    origin.target.className += " completed";
  }
});

apagaTudo.addEventListener("click", () => {
  // Referência - https://www.w3schools.com/jsref/met_node_removechild.asp
  while (taskList.hasChildNodes()) {
    taskList.removeChild(taskList.firstChild);
  }
});

removeFinalizados.addEventListener("click", () => {
  const task = document.querySelectorAll(".task");
  for (let i = 0; i < task.length; i += 1) {
    if (task[i].className.includes("completed")) {
      task[i].remove();
    }
  }
});
// Consultei o repositório do Leonardo Ferraz
// https://github.com/tryber/sd-020-a-project-todo-list/tree/leonardo-ferraz-todo-list-project
saveTask.addEventListener("click", () => {
  localStorage.setItem("task", taskList.innerHTML);
});

function selectedTask() {
  const taskItens = document.querySelector("#lista-tarefas").childNodes;
  for (let i = 0; i < taskItens.length; i += 1) {
    if (taskItens[i].className.includes("selected")) {
      const selectedTaskIndex = i;
      return selectedTaskIndex;
    }
  }
}

// Referencia - https://www.w3schools.com/jsref/met_node_insertbefore.asp
moveUp.addEventListener("click", () => {
  const taskItens = document.querySelector("#lista-tarefas");

  const selectedTaskIndex = selectedTask();
  const aboveTaskIndex = selectedTaskIndex - 1;

  const selectedTaskItem = taskItens.childNodes[selectedTaskIndex];

  if (selectedTaskIndex > 0) {
    taskItens.insertBefore(
      selectedTaskItem,
      taskItens.childNodes[aboveTaskIndex]
    );
  }
});

moveDown.addEventListener("click", () => {
  const lengthTasks = taskList.childNodes.length;
  const selectedTaskIndex = selectedTask();
  const belowTaskIndex = selectedTaskIndex + 2;

  const selectedTaskItem = taskList.childNodes[selectedTaskIndex];

  if (selectedTaskIndex < lengthTasks) {
    taskList.insertBefore(
      selectedTaskItem,
      taskList.childNodes[belowTaskIndex]
    );
  }
});

clearSelected.addEventListener("click", () => {
  const taskItens = document.querySelectorAll(".task");

  for (let i = 0; i < taskItens.length; i += 1) {
    if (taskItens[i].className.includes("selected")) {
      taskItens[i].remove();
    }
  }
});
