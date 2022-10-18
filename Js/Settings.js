let taskdiv = document.querySelector(".Reset");
taskdiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("Reomveall")) {
    window.localStorage.clear();
  }
});
