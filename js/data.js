'use strict';

(function () {
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

  const getRandRange = window.util.getRandRange;
  const getRandElement = window.util.getRandElement;

  const mapPin = document.querySelector(`.map__pin`);

  const generateOffers = function (count) {
    const offers = [];

    for (let i = 1; i <= count; i++) {
      let locationX = getRandRange(0, window.main.map.clientWidth);
      let locationY = getRandRange(130 - mapPin.clientHeight, 630 - mapPin.clientHeight);

      offers.push({
        "author": {
          "avatar": `img/avatars/user${i.toString().padStart(2, `0`)}.png`
        },
        "offer": {
          "title": `Заголовок`,
          "address": `${Math.round(locationX + (mapPin.clientWidth / 2))}, ${locationY + mapPin.clientHeight}`,
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

  const offers = generateOffers(OFFERS_COUNT);

  window.data = {
    offers, TYPES
  };
})();
