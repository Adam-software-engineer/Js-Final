// main site javascript

async () => {
  const button = document.querySelector("button");
  const input = document.querySelector("input");
  const ul = document.querySelector("ul");
};


// CSS JS for webpage nev
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("Nav");
var sticky = navbar.offsetTop;

// Add the sticky class to the nav when you scroll
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
