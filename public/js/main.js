import { getAllData } from "./site.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await getAllData();
      
      if (data) {
            const randomMenuItem = getRandomItem(data.menu);
            const randomEvent = getRandomItem(data.events);
    

            const dailySpecialCard = document.querySelector('.rightcolumn .card:first-child');
            
            if (dailySpecialCard) {
                const dailySpecialImgDiv = dailySpecialCard.querySelector('.fakeimg');
                dailySpecialImgDiv.innerHTML = ''; 
                const dailySpecialImg = document.createElement('img');
                dailySpecialImg.src = randomMenuItem.imageurl;
                dailySpecialImg.alt = randomMenuItem.name;
                dailySpecialImgDiv.appendChild(dailySpecialImg);
                dailySpecialCard.querySelector('p').textContent = randomMenuItem.description;
                dailySpecialCard.querySelector('h3').textContent = randomMenuItem.name;
            }
            
            const popularEventCard = document.querySelector('.rightcolumn .card:nth-child(2)');     
            
            if (popularEventCard) {
                const popularEventImgDiv = popularEventCard.querySelector('.fakeimg');
                popularEventImgDiv.innerHTML = ''; 
                const popularEventImg = document.createElement('img');
                popularEventImg.src = randomEvent.imageurl;
                popularEventImg.alt = randomEvent.name;
                popularEventImgDiv.appendChild(popularEventImg);
                popularEventCard.querySelector('p').textContent = randomEvent.location;  
                popularEventCard.querySelector('h3').textContent = randomEvent.name;
            }
        } else {
            console.error('You have failed me DB.');
        }
    } catch (error) {
      console.error('You have failed me DB for the first time:', error);
    }
  });

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}