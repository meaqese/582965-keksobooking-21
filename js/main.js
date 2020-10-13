'use strict';

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

Math.randRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};


const generateOffers = function (count) {
  const types = [`palace`, `flat`, `house`, `bungalow`];
  const checkInHours = [`12:00`, `13:00`, `14:00`];
  const checkOutHours = [`12:00`, `13:00`, `14:00`];
  const featuresList = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const photosList = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const offers = [];

  for (let i = 1; i <= count; i++) {
    let locationX = Math.randRange(0, map.clientWidth);
    let locationY = Math.randRange(130, 630);

    offers.push({
      "author": {
        "avatar": `img/avatars/user${i.toString().padStart(2, `0`)}.png`
      },
      "offer": {
        "title": `Заголовок`,
        "address": `${locationX}, ${locationY}`,
        "price": 100,
        "type": types[Math.randRange(0, types.length - 1)],
        "rooms": i,
        "guests": i,
        "checkin": checkInHours[Math.randRange(0, checkInHours.length - 1)],
        "checkout": checkOutHours[Math.randRange(0, checkOutHours.length - 1)],
        "features": featuresList.slice(0, Math.randRange(1, featuresList.length)),
        "description": `Описание`,
        "photos": photosList.slice(0, Math.randRange(1, photosList.length))
      },
      "location": {
        "x": locationX,
        "y": locationY
      }
    });
  }

  return offers;
};

const createOffers = function (offers) {
  const fragment = document.createDocumentFragment();

  for (let offer of offers) {
    let pinItem = mapPinTemplate.cloneNode(true);

    pinItem.style.left = `${offer.location.x + pinItem.clientWidth}px`;
    pinItem.style.top = `${offer.location.y + pinItem.clientHeight}px`;

    let image = pinItem.querySelector(`img`);
    image.src = offer.author.avatar;
    image.alt = offer.offer.title;

    fragment.appendChild(pinItem);
  }

  return fragment;
};


const renderOffers = function (fragment) {
  const mapPins = map.querySelector(`.map__pins`);

  mapPins.appendChild(fragment);
};

renderOffers(
    createOffers(generateOffers(8))
);
