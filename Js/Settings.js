let taskdiv = document.querySelector(".Reset");
taskdiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("Reomveall")) {
    window.localStorage.clear();
  }
});
// window.localStorage.setItem("Tasks", JSON.stringify(arrayOfTasks));
let button = document.querySelector(".slider");

window.localStorage.setItem("power", button);
button.addEventListener("click", function (params) {
  console.log(button);
});
