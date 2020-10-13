'use strict';

const OFFERS_COUNT = 8;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_HOURS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_HOURS = [`12:00`, `13:00`, `14:00`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LIST = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

Math.randRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};

Math.randElement = function (array, inclusive = false) {
  const max = (inclusive === false) ? array.length - 1 : array.length;
  return array[Math.randRange(0, max)];
};

const generateOffers = function (count) {
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
        "type": TYPES[Math.randRange(0, TYPES.length - 1)],
        "rooms": i,
        "guests": i,
        "checkin": Math.randElement(CHECKIN_HOURS),
        "checkout": Math.randElement(CHECKOUT_HOURS),
        "features": FEATURES_LIST.slice(0, Math.randRange(1, FEATURES_LIST.length)),
        "description": `Описание`,
        "photos": PHOTOS_LIST.slice(0, Math.randRange(1, PHOTOS_LIST.length))
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
    createOffers(generateOffers(OFFERS_COUNT))
);
