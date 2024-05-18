import { getAllData } from "./site.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getAllData();

    if (data) {
      const randomMenuItem = getRandomItem(data.menu);
      const randomEvent = getRandomItem(data.events);

      const DailySpecialCard = document.querySelector(
        ".rightcolumn .card:first-child",
      );

      if (DailySpecialCard) {
        const DailySpecialImgDiv = DailySpecialCard.querySelector(".fakeimg");
        DailySpecialImgDiv.innerHTML = "";
        const DailySpecialImg = document.createElement("img");
        DailySpecialImg.src = randomMenuItem.imageurl;
        DailySpecialImg.alt = randomMenuItem.name;
        DailySpecialImgDiv.appendChild(DailySpecialImg);
        DailySpecialCard.querySelector("p").textContent =
          randomMenuItem.description;
        DailySpecialCard.querySelector("h3").textContent = randomMenuItem.name;

        DailySpecialImg.addEventListener("click", () => {
          location.replace("../Menu.html");
        });
      }

      const PopularEventCard = document.querySelector(
        ".rightcolumn .card:nth-child(2)",
      );

      if (PopularEventCard) {
        const PopularEventImgDiv = PopularEventCard.querySelector(".fakeimg");
        PopularEventImgDiv.innerHTML = "";
        const PopularEventImg = document.createElement("img");
        PopularEventImg.src = randomEvent.imageurl;
        PopularEventImg.alt = randomEvent.name;
        PopularEventImgDiv.appendChild(PopularEventImg);
        PopularEventCard.querySelector("p").textContent = randomEvent.location;
        PopularEventCard.querySelector("h3").textContent = randomEvent.name;

        PopularEventImg.addEventListener("click", () => {
          location.replace("../Menu.html");
        });
      }
    } else {
      console.error("You have failed me DB.");
    }
  } catch (error) {
    console.error("You have failed me DB for the first time:", error);
  }
});

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
