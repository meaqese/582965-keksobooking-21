'use strict';

(function () {
  const clearAllChildren = window.util.clearAllChildren;

  const popupClose = function () {
    const popup = window.main.map.querySelector(`.map__card`);
    popup.remove();

    document.removeEventListener(`keydown`, popupClosePressESC);
  };

  const popupClosePress = function () {
    popupClose();
  };

  const popupClosePressESC = function (evt) {
    if (evt.key === `Escape`) {
      popupClose();
    }
  };

  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const createCard = function (offerObject) {
    const {offer, author} = offerObject;
    const card = cardTemplate.cloneNode(true);
    const closeButton = card.querySelector(`.popup__close`);

    card.querySelector(`.popup__title`).textContent = offer.title;
    card.querySelector(`.popup__text--address`).textContent = offer.address;
    card.querySelector(`.popup__text--price`).textContent = `${offer.price}₽/ночь`;
    card.querySelector(`.popup__type`).textContent = window.data.TYPES[offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

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

    closeButton.addEventListener(`click`, popupClosePress);
    document.addEventListener(`keydown`, popupClosePressESC);

    return card;
  };

  window.card = {
    createCard
  };
})();
