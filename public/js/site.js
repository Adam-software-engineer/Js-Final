/// Add the sticky class to the nav when you scroll
var navbar = document.getElementById("Nav");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
// this is all the exports for the DB fetching will  be done here

// fetching all the menu data
export const fetchMenuData = async () => {
  try {
    const res = await fetch("/api/Menu");
    if (!res.ok) {
      throw new Error("Network is not ok");
    }
    const foodMenu = await res.json();
    return foodMenu;
  } catch (error) {
    console.error("You have failed me menu data: ", error);
    return null;
  }
};

// fetching all the event data
export const fetchEventData = async () => {
  try {
    const res = await fetch("/api/Events");
    if (!res.ok) {
      throw new Error("Network is not ok");
    }
    const events = await res.json();
    return events;
  } catch (error) {
    console.error("You have failed me event data: ", error);
    return null;
  }
};

// fetching all the data at ones
export const getAllData = async () => {
  const menuData = await fetchMenuData();
  const eventData = await fetchEventData();

  if (menuData && eventData) {
    return { menu: menuData, events: eventData };
  } else {
    return null;
  }
};

// CSS JS for webpage nev
window.onscroll = function () {
  myFunction();
};
