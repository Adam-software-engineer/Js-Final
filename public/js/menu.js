import { getAllData } from "./site.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Function to create a card
  const createCard = (title, imgSrc, description, price) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const h2 = document.createElement("h2");
    h2.textContent = title;

    const fakeimg = document.createElement("div");
    fakeimg.classList.add("fakeimg");
    //fakeimg.textContent = title;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = title;

    fakeimg.appendChild(img);

    const desc = document.createElement("p");
    desc.textContent = description;

    const small = document.createElement("p");
    small.innerHTML = `<small>${price}</small>`;

    card.appendChild(h2);
    card.appendChild(fakeimg);
    card.appendChild(desc);
    card.appendChild(small);

    return card;
  };

  // Fetch data and append cards to body
  try {
    const data = await getAllData();
    if (data) {
      data.menu.forEach((item) => {
        const card = createCard(
          item.name,
          item.imageurl,
          item.description,
          item.price,
        );
        document.body.appendChild(card);
      });
      data.events.forEach((event) => {
        const card = createCard(
          event.name,
          event.imageurl,
          event.location,
          event.date,
          event.totalhours,
        );
        document.body.appendChild(card);
      });
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Failed to fetch data.";
      document.body.appendChild(errorMessage);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "An error occurred while fetching data.";
    document.body.appendChild(errorMessage);
  }
});
