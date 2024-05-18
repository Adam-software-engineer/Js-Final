// imports from site.js for the grab data stuff
import { fetchMenuData, fetchEventData } from "./site.js";

// all the grabs for the queryselectors
const eventsTable = document.querySelector(".eventsTable");
const menuTable = document.querySelector(".menuTable");
const EventAddButton = document.querySelector(".add");
const MenuAddButton = document.querySelector(".MenuAdd");
const EventUpdateButton = document.querySelector(".update");
const MenuUpdateButton = document.querySelector(".MenuUpdate");
const EventDeleteButton = document.querySelector(".delete");
const MenuDeleteButton = document.querySelector(".MenuDelete");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const events = await fetchEventData();
    const menu = await fetchMenuData();

    events.forEach((event) => {
      const row = eventsTable.insertRow();
      row.innerHTML = `
        <td><a href="#" class="event-link" data-name="${event.name}" data-location="${event.location}" data-date="${event.date}" data-hours="${event.totalhours}" data-imageurl="${event.imageurl}"  data-id="${event._id}">${event.name}</a></td>
        <td>${event.location}</td>
        <td>${event.date}</td>
        <td>${event.totalhours}</td>
        <td style="display:none;">${event._id}</td> 
      `;
    });

    menu.forEach((menu) => {
      const row = menuTable.insertRow();
      row.innerHTML = `
        <td><a href="#" class="menu-link" data-name="${menu.name}" data-description="${menu.description}" data-price="${menu.price}" data-imageurl="${menu.imageurl}"  data-id="${menu._id}">${menu.name}</a></td>
        <td>${menu.description}</td>
        <td>${menu.price}</td>
        <td style="display:none;">${menu._id}</td>
      `;
    });

    const eventLinks = document.querySelectorAll(".event-link");
    eventLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const { id, name, location, date, hours, imageurl } = link.dataset;
        document.getElementById("eventid").value = id;
        document.getElementById("eventName").value = name;
        document.getElementById("eventLocation").value = location;
        document.getElementById("eventDate").value = date;
        document.getElementById("eventHours").value = hours;
        document.getElementById("eventImageurl").value = imageurl;
      });
    });

    const menuLinks = document.querySelectorAll(".menu-link");
    menuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const { id, name, description, price, imageurl } = link.dataset;
        document.getElementById("menuid").value = id;
        document.getElementById("itemName").value = name;
        document.getElementById("itemDescription").value = description;
        document.getElementById("itemPrice").value = price;
        document.getElementById("itemImageurl").value = imageurl;
      });
    });

    EventAddButton.addEventListener("click", async () => {
      const eventName = document.getElementById("eventName").value;
      const eventLocation = document.getElementById("eventLocation").value;
      const eventDate = document.getElementById("eventDate").value;
      const eventHours = document.getElementById("eventHours").value;
      const eventImageurl = document.getElementById("eventImageurl").value;

      try {
        const Res = await fetch("/api/Events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: eventName,
            location: eventLocation,
            date: eventDate,
            totalhours: eventHours,
            imageurl: eventImageurl,
          }),
        });

        location.reload();
      } catch (error) {
        console.error("Error adding new event:", error);
      }

      document.getElementById("eventName").value = "";
      document.getElementById("eventLocation").value = "";
      document.getElementById("eventDate").value = "";
      document.getElementById("eventHours").value = "";
      document.getElementById("eventImageurl").value = "";
    });

    MenuAddButton.addEventListener("click", async () => {
      const itemName = document.getElementById("itemName").value;
      const itemDescription = document.getElementById("itemDescription").value;
      const itemPrice = document.getElementById("itemPrice").value;
      const itemImageurl = document.getElementById("itemImageurl").value;

      try {
        const Res = await fetch("/api/Menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            imageurl: itemImageurl,
          }),
        });

        location.reload();
      } catch (error) {
        console.error("Error adding new item:", error);
      }

      document.getElementById("itemName").value = "";
      document.getElementById("itemDescription").value = "";
      document.getElementById("itemPrice").value = "";
      document.getElementById("itemImageurl").value = "";
    });

    EventUpdateButton.addEventListener("click", async () => {
      const eventName = document.getElementById("eventName").value;
      const eventLocation = document.getElementById("eventLocation").value;
      const eventDate = document.getElementById("eventDate").value;
      const eventHours = document.getElementById("eventHours").value;
      const eventImageurl = document.getElementById("eventImageurl").value;
      const id = document.getElementById("eventid").value;

      try {
        const Res = await fetch(`/api/Events/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: eventName,
            location: eventLocation,
            date: eventDate,
            totalhours: eventHours,
            imageurl: eventImageurl,
          }),
        });

        location.reload();
      } catch (error) {
        console.error("Error updating event:", error);
      }

      document.getElementById("eventName").value = "";
      document.getElementById("eventLocation").value = "";
      document.getElementById("eventDate").value = "";
      document.getElementById("eventHours").value = "";
      document.getElementById("eventImageurl").value = "";
    });

    MenuUpdateButton.addEventListener("click", async () => {
      const itemName = document.getElementById("itemName").value;
      const itemDescription = document.getElementById("itemDescription").value;
      const itemPrice = document.getElementById("itemPrice").value;
      const itemImageurl = document.getElementById("itemImageurl").value;
      const id = document.getElementById("menuid").value;

      try {
        const Res = await fetch(`/api/Menu/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            imageurl: itemImageurl,
          }),
        });

        location.reload();
      } catch (error) {
        console.error("Error updating item:", error);
      }

      document.getElementById("itemName").value = "";
      document.getElementById("itemDescription").value = "";
      document.getElementById("itemPrice").value = "";
      document.getElementById("itemImageurl").value = "";
    });

    EventDeleteButton.addEventListener("click", async () => {
      const id = document.getElementById("eventid").value;

      try {
        const Res = await fetch(`/api/Events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        location.reload();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    });

    MenuDeleteButton.addEventListener("click", async () => {
      const id = document.getElementById("menuid").value;

      try {
        const Res = await fetch(`/api/Menu/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        location.reload();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
