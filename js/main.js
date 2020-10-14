'use strict';

const OFFER_FOR_CARD = 0;
const OFFERS_COUNT = 8;
const TYPES = {
  en: [`palace`, `flat`, `house`, `bungalow`],
  ru: [`Дворец`, `Квартира`, `Дом`, `Бунгало`]
};
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
const mapPins = map.querySelector(`.map__pins`);

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const getRandRange = function (min, max) {
  return Math.round(min + (Math.random() * (max - min)));
};

const getRandElement = function (array, inclusive = false) {
  const max = (inclusive === false) ? array.length - 1 : array.length;
  return array[getRandRange(0, max)];
};

const generateOffers = function (count) {
  const offers = [];

  for (let i = 1; i <= count; i++) {
    let locationX = getRandRange(0, map.clientWidth);
    let locationY = getRandRange(130, 630);

    offers.push({
      "author": {
        "avatar": `img/avatars/user${i.toString().padStart(2, `0`)}.png`
      },
      "offer": {
        "title": `Заголовок`,
        "address": `${locationX}, ${locationY}`,
        "price": 100,
        "type": TYPES.en[getRandRange(0, TYPES.en.length - 1)],
        "rooms": i,
        "guests": i,
        "checkin": getRandElement(CHECKIN_HOURS),
        "checkout": getRandElement(CHECKOUT_HOURS),
        "features": FEATURES_LIST.slice(0, getRandRange(1, FEATURES_LIST.length)),
        "description": `Описание`,
        "photos": PHOTOS_LIST.slice(0, getRandRange(1, PHOTOS_LIST.length))
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
  mapPins.append(fragment);
};

const offers = generateOffers(OFFERS_COUNT);

renderOffers(
    createOffers(offers)
);

const clearAllChilds = function (parentNode) {
  while (parentNode.lastElementChild) {
    parentNode.removeChild(parentNode.lastElementChild);
  }
};

const createCard = function (offersList, need) {
  const fragment = document.createDocumentFragment();

  const {offer, author} = offersList[need];
  const card = cardTemplate.cloneNode(true);

  card.querySelector(`.popup__title`).textContent = offer.title;
  card.querySelector(`.popup__text--address`).textContent = offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${offer.price}₽/ночь`;
  card.querySelector(`.popup__type`)
    .textContent = TYPES.ru[
      TYPES.en.indexOf(offer.type)
    ];
  card.querySelector(`.popup__text--capacity`)
    .textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector(`.popup__text--time`)
    .textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featuresList = card.querySelector(`.popup__features`);
  clearAllChilds(featuresList);
  for (let feature of offer.features) {
    let featureItem = document.createElement(`li`);
    featureItem.classList.add(`popup__feature`);
    featureItem.classList.add(`popup__feature--${feature}`);

    featuresList.append(featureItem);
  }
  card.querySelector(`.popup__description`).textContent = offer.description;

  const photosList = card.querySelector(`.popup__photos`);
  clearAllChilds(photosList);
  for (let photo of offer.photos) {
    let photoItem = document.createElement(`img`);
    photoItem.width = 45;
    photoItem.height = 40;

    photoItem.src = photo;
    photoItem.alt = `Фотография жилья`;
    photoItem.classList.add(`popup__photo`);


    photosList.append(photoItem);
  }

  card.querySelector(`.popup__avatar`).src = author.avatar;

  fragment.append(card);

  return fragment;
};

mapPins.after(createCard(offers, OFFER_FOR_CARD));
