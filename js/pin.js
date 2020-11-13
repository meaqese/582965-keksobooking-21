'use strict';


const MAX_OFFERS_COUNT = 5;

const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapPins = window.main.map.querySelector(`.map__pins`);

const createPins = (offers) => {
  const fragment = document.createDocumentFragment();

  const maxOffers = offers.length > MAX_OFFERS_COUNT ? MAX_OFFERS_COUNT : offers.length;

  for (let i = 0; i < maxOffers; i++) {
    let pinItem = mapPinTemplate.cloneNode(true);
    const offer = offers[i];

    pinItem.style.left = `${offer.location.x}px`;
    pinItem.style.top = `${offer.location.y}px`;

    let image = pinItem.querySelector(`img`);
    image.src = offer.author.avatar;
    image.alt = offer.offer.title;

    pinItem.addEventListener(`click`, () => {
      window.util.clearAllElements(`.map__card`, window.main.map);
      mapPins.after(window.card.createCard(offer));
    });

    fragment.appendChild(pinItem);
  }

  return fragment;
};

const renderPins = (fragment) => {
  window.util.clearAllElements(`.map__pin:not(.map__pin--main)`, mapPins);

  mapPins.append(fragment);
};

window.pin = {
  renderPins, createPins
};

