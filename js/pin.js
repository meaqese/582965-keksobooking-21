'use strict';

(function () {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPins = window.main.map.querySelector(`.map__pins`);

  const createPins = function (offers) {
    const fragment = document.createDocumentFragment();

    for (let offer of offers) {
      let pinItem = mapPinTemplate.cloneNode(true);

      pinItem.style.left = `${offer.location.x + pinItem.clientWidth}px`;
      pinItem.style.top = `${offer.location.y + pinItem.clientHeight}px`;

      let image = pinItem.querySelector(`img`);
      image.src = offer.author.avatar;
      image.alt = offer.offer.title;

      pinItem.addEventListener(`click`, function () {
        window.util.clearAllElements(`.map__card`, window.main.map);
        mapPins.after(window.card.createCard(offer));
      });

      fragment.appendChild(pinItem);
    }

    return fragment;
  };

  const renderPins = function (fragment) {
    mapPins.append(fragment);
  };

  window.pin = {
    renderPins, createPins
  };
})();
