// main site javascript

async () => {
  const button = document.querySelector("button");
  const input = document.querySelector("input");
  const ul = document.querySelector("ul");

  const getMenuItems = async () => {
    const response = await fetch("/api/menu");
    const FoodMenu = await response.json();

    return FoodMenu;
  };

  const getEventItems = async () => {
    const response = await fetch("/api/events");
    const EventMenu = await response.json();

    return EventMenu;
  };

  const displayMenuItems = (FoodMenu) => {
    ul.innerHTML = "";
    FoodMenu.forEach(({ Name, Description, Price, imageURL }) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const span = document.createElement("span");
      (span.textContent = Name, Description, Price, imageURL);

      li.appendChild(span);
    });
  
  const displayEventItems = (EventMenu) => {
    ul.innerHTML = "";
    EventMenu.forEach(({ Name, Location, Date, Hours, imageURL }) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const span = document.createElement("span");
      (span.textContent = Name, Location, Date, Hours, imageURL);

      li.appendChild(span);
    });

  };
  displayEventItems(await getEventItems());
  displayMenuItems(await getMenuItems());
};

// CSS JS for webpage nev
window.onscroll = function () {
  myFunction();
};
var navbar = document.getElementById("Nav");
var sticky = navbar.offsetTop;

// Add the sticky class to the nav when you scroll
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
