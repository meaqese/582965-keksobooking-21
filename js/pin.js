'use strict';

(function () {
  const MAX_OFFERS_COUNT = 5;

  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = window.main.map.querySelector(`.map__pins`);

  const createPins = function (offers) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < MAX_OFFERS_COUNT; i++) {
      let pinItem = mapPinTemplate.cloneNode(true);

      pinItem.style.left = `${offers[i].location.x}px`;
      pinItem.style.top = `${offers[i].location.y}px`;

      let image = pinItem.querySelector(`img`);
      image.src = offers[i].author.avatar;
      image.alt = offers[i].offer.title;

      pinItem.addEventListener(`click`, function () {
        window.util.clearAllElements(`.map__card`, window.main.map);
        mapPins.after(window.card.createCard(offers[i]));
      });

      fragment.appendChild(pinItem);
    }

    return fragment;
  };

  const renderPins = function (fragment) {
    window.util.clearAllElements(`.map__pin:not(.map__pin--main)`, mapPins);

    mapPins.append(fragment);
  };

  window.pin = {
    renderPins, createPins
  };
})();
