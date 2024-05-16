import { fetchMenuData, fetchEventData } from './site.js';

document.addEventListener('DOMContentLoaded', async () => {
  const eventsTable = document.querySelector('.eventsTable');
  const menuTable = document.querySelector('.menuTable');
  const eventForm = document.querySelector('.eventform');
  const menuForm = document.querySelector('.menuform');
  const addButton = document.getElementsByClassName('.add')

  try {
    const events = await fetchEventData();
    const menu = await fetchMenuData();

    events.forEach(event => {
      const row = eventsTable.insertRow();
      row.innerHTML = `
        <td><a href="#" class="event-link" data-name="${event.name}" data-location="${event.location}" data-date="${event.date}" data-hours="${event.totalhours}">${event.name}</a></td>
        <td>${event.location}</td>
        <td>${event.date}</td>
        <td>${event.totalhours}</td>
      `;
    });

    menu.forEach(menu => {
      const row = menuTable.insertRow();
      row.innerHTML = `
        <td><a href="#" class="menu-link" data-name="${menu.name}" data-description="${menu.description}" data-price="${menu.price}" >${menu.name}</a></td>
        <td>${menu.description}</td>
        <td>${menu.price}</td>
      `;
    });

    const eventLinks = document.querySelectorAll('.event-link');
    eventLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const { name, location, date, hours } = link.dataset;
        document.getElementById('eventName').value = name;
        document.getElementById('eventLocation').value = location;
        document.getElementById('eventDate').value = date;
        document.getElementById('eventHours').value = hours;

      });
    });

    const menuLinks = document.querySelectorAll('.menu-link')
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const {name, description, price} = link.dataset;
            document.getElementById('itemName').value = name;
            document.getElementById('itemDescription').value = description;
            document.getElementById('itemPrice').value = price;
        })
    })

    eventForm.addEventListener('addButton', async () => {
        const eventName = document.getElementById('eventName').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventHours = document.getElementById('eventHours').value;
  
        try {
          const Res = await fetch('/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventName, eventLocation, eventDate, eventHours})
          });
        } catch (error) {
          console.error('Error adding new event:', error);
        }

    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});