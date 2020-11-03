'use strict';

// const OFFER_FOR_CARD = 0;
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
const mapPin = map.querySelector(`.map__pin--main`);
const mapPinAfter = getComputedStyle(mapPin, `::after`);

const mapPins = map.querySelector(`.map__pins`);

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const mapFilters = map.querySelector(`.map__filters`);
const mapFiltersBlocks = mapFilters.querySelectorAll(`select, fieldset`);

const adForm = document.querySelector(`.ad-form`);
const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

const getInactivePinCoords = function () {
  const mapPinStyles = getComputedStyle(mapPin);

  const x = Math.round(parseInt(mapPinStyles.left, 10) + parseInt(mapPinStyles.width, 10) / 2);
  const y = Math.round(mapPin.clientHeight / 2 + mapPin.offsetTop);

  return [x, y];
};

const addressInput = adForm.querySelector(`#address`);
addressInput.value = getInactivePinCoords().join(`, `);


const disableAll = function (elements = HTMLAllCollection) {
  for (let element of elements) {
    element.disabled = true;
  }
};

const enableAll = function (elements = HTMLAllCollection) {
  for (let element of elements) {
    element.disabled = false;
  }
};

disableAll(adFormFieldsets);
disableAll(mapFiltersBlocks);


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

/* const clearAllChildren = function (parentNode) {
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
  clearAllChildren(featuresList);
  for (let feature of offer.features) {
    let featureItem = document.createElement(`li`);
    featureItem.classList.add(`popup__feature`);
    featureItem.classList.add(`popup__feature--${feature}`);

    featuresList.append(featureItem);
  }
  card.querySelector(`.popup__description`).textContent = offer.description;

  const photosList = card.querySelector(`.popup__photos`);
  const photoItem = photosList.querySelector(`.popup__photo`);

  clearAllChildren(photosList);
  for (let photo of offer.photos) {
    let newPhotoItem = photoItem.cloneNode(true);
    newPhotoItem.src = photo;

    photosList.append(newPhotoItem);
  }

  card.querySelector(`.popup__avatar`).src = author.avatar;

  fragment.append(card);

  return fragment;
};

mapPins.after(createCard(offers, OFFER_FOR_CARD));*/

const getActivePinCoords = function () {
  const x = Math.round(mapPin.clientWidth / 2 + mapPin.offsetLeft);
  const y = parseInt(getComputedStyle(mapPin).top, 10) + mapPin.clientHeight + parseInt(mapPinAfter.height, 10);

  return [x, y];
};


const doActiveAll = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  enableAll(adFormFieldsets);
  enableAll(mapFiltersBlocks);

  addressInput.value = getActivePinCoords().join(`, `);
};

mapPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    doActiveAll();
  }
});

mapPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    doActiveAll();
  }
});

const roomsCount = adForm.querySelector(`#room_number`);
const guestsCount = adForm.querySelector(`#capacity`);

const checkCompatibility = function (input) {
  const rooms = parseInt(roomsCount.value, 10);
  const guests = parseInt(guestsCount.value, 10);

  if (rooms === 100 && guests > 0) {
    input.setCustomValidity(`Жилье не для гостей`);
  } else if (rooms < guests) {
    input.setCustomValidity(`Количество комнат меньше количества гостей`);
  } else {
    input.setCustomValidity(``);
  }

  input.reportValidity();
};

roomsCount.addEventListener(`change`, function () {
  checkCompatibility(roomsCount);
});

guestsCount.addEventListener(`change`, function () {
  checkCompatibility(guestsCount);
});
