let input = document.querySelector(".Input");
let submit = document.querySelector(".Add");
let taskdiv = document.querySelector(".Tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

if (localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}
getDataToLocalStorageFrom();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

taskdiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Element From Page
    e.target.parentElement.remove();
    //remove it from local storage
    deleteTaskFromlocalStorage(
      e.target.parentElement.getAttribute("Task-name")
    );
  }
  if (e.target.classList.contains("comp")) {
    // Toggle Completed For The Task
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  //  Add Tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // Add task to local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

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
}

function deleteTaskFromlocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
