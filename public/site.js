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

//----//
// this is all the db stuff and things //
//---//

export const fetchMenuData = async () => {
  try {
    const res = await fetch("/api/Menu");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const foodMenu = await res.json();
    return foodMenu;
  } catch (error) {
    console.error("Failed to fetch menu data:", error);
    return null;
  }
};

export const fetchEventData = async () => {
  try {
    const res = await fetch("/api/Events");
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const events = await res.json();
    return events;
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    return null;
  }
};

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
