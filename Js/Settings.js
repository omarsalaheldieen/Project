let taskdiv = document.querySelector(".Reset");
taskdiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("Reomveall")) {
    window.localStorage.clear();
  }
});
Powerbutton();
function Powerbutton() {
  var onclick = changeContent();
  var ltsg = document.querySelector(".slider");
  ltsg.addEventListener("click", onclick, true);
}
var state = localStorage.getItem("state");
function changeContent() {
  var count = 1;
  // Store the State of the power in local storage
  var next = function () {
    if (count === 1) {
      localStorage.setItem("state", count);
      count = 0;
    } else {
      localStorage.setItem("state", count);
      count = 1;
    }
  };
  return next;
}
