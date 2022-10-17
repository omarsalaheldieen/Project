let taskdiv = document.querySelector(".Tasks");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let tasksactive = document.querySelector(".tasks-active span");

if (localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}
getDataToLocalStorageFrom();

taskdiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Element From Page
    e.target.parentElement.remove();
    //remove it from local storage
    deleteTaskFromlocalStorage(
      e.target.parentElement.getAttribute("Task-name")
    );
    CalculateTasks();
  }
  if (e.target.classList.contains("comp")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute("Task-name"));
    // Toggle Done Class\
    e.target.classList.toggle("done");
    window.onload = deleteTaskFromlocalStorage(
      e.target.parentElement.getAttribute("Task-name")
    );
  }
  CalculateTasks();
});

function addElementsToPageFrom(arrayOfTasks) {
  taskdiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("Task-name", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create complete button
    let completed = document.createElement("span");
    completed.className = "comp";
    completed.appendChild(document.createTextNode("Completed"));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Create Update Button
    let span1 = document.createElement("span");
    span1.className = "Upd";
    span1.appendChild(document.createTextNode("Update"));
    div.appendChild(span1);

    // Append Button To Main Div
    div.appendChild(completed);
    div.appendChild(span);
    // Add Task Div To Tasks Container
    taskdiv.appendChild(div);
    console.log(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
}

function getDataToLocalStorageFrom() {
  let Data = window.localStorage.getItem("Tasks");
  if (Data) {
    let tasks = JSON.parse(Data);
    addElementsToPageFrom(tasks);
  }
  CalculateTasks();
}

function deleteTaskFromlocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
// Function To calculate tasks
function CalculateTasks() {
  //Calculate the Tasks
  tasksCount.innerHTML = document.querySelectorAll(`.Tasks .task`).length;
  //Calculte the finished Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(`.Tasks .done`).length;
  //calculate the active tasks
  tasksactive.innerHTML =
    (tasksCount.innerHTML = document.querySelectorAll(`.Tasks .task`).length) -
    (tasksCompleted.innerHTML =
      document.querySelectorAll(`.Tasks .done`).length);
}