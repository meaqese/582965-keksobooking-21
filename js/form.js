'use strict';

(function () {
  const adForm = window.main.adForm;

  const mapPinMain = window.main.map.querySelector(`.map__pin--main`);
  const mapPins = window.main.map.querySelector(`.map__pins`);

  const getInactivePinCoords = function () {
    const mapPinStyles = getComputedStyle(mapPinMain);

    const x = Math.round(parseInt(mapPinStyles.left, 10) + parseInt(mapPinStyles.width, 10) / 2);
    const y = Math.round(mapPinMain.clientHeight / 2 + mapPinMain.offsetTop);

    return [x, y];
  };

  const doInactiveAll = function () {
    window.main.map.classList.add(`map--faded`);
    window.main.adForm.classList.add(`ad-form--disabled`);
    window.util.disableAll(window.main.adFormFieldsets);
    window.util.disableAll(window.main.mapFiltersBlocks);
    mapPinMain.style.top = `375px`;
    mapPinMain.style.left = `570px`;

    window.util.clearAllElements(`.map__pin:not(.map__pin--main)`, mapPins);
    window.util.clearAllElements(`.map__card`, window.main.map);

    adForm.reset();
    window.filters.filters.reset();

    addressInput.value = getInactivePinCoords().join(`, `);
  };

  const addressInput = adForm.querySelector(`#address`);
  addressInput.value = getInactivePinCoords().join(`, `);

  const roomsCount = adForm.querySelector(`#room_number`);
  const guestsCount = adForm.querySelector(`#capacity`);

  const checkRoomsAndGuestsCompatibility = function (input) {
    const rooms = parseInt(roomsCount.value, 10);
    const guests = parseInt(guestsCount.value, 10);

    if (rooms === 100 && guests > 0) {
      input.setCustomValidity(`Жилье не для гостей`);
    } else if (rooms < 100 && guests === 0) {
      input.setCustomValidity(`Жилье только для гостей`);
    } else if (rooms < guests) {
      input.setCustomValidity(`Количество комнат меньше количества гостей`);
    } else {
      roomsCount.setCustomValidity(``);
      guestsCount.setCustomValidity(``);
    }

    input.reportValidity();
  };

  roomsCount.addEventListener(`change`, function () {
    checkRoomsAndGuestsCompatibility(roomsCount);
  });

  guestsCount.addEventListener(`change`, function () {
    checkRoomsAndGuestsCompatibility(guestsCount);
  });

  const houseType = adForm.querySelector(`#type`);
  const priceInput = adForm.querySelector(`#price`);
  houseType.addEventListener(`change`, function () {
    const houseTypeValue = houseType.value;
    const minPricesList = {
      bungalow: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    priceInput.setAttribute(`min`, minPricesList[houseTypeValue]);
    priceInput.setAttribute(`placeholder`, minPricesList[houseTypeValue]);
    priceInput.reportValidity();
  });

  priceInput.addEventListener(`input`, function () {
    priceInput.reportValidity();
  });

  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);

  const synchronizeTimeInAndOut = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  timeIn.addEventListener(`change`, synchronizeTimeInAndOut);
  timeOut.addEventListener(`change`, synchronizeTimeInAndOut);

  const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);
  const closeSuccessMessage = function () {
    const message = document.querySelector(`.success`);
    message.remove();

    document.removeEventListener(`keydown`, closeSuccessMessageESC);
    document.removeEventListener(`click`, closeSuccessMessageClick);
  };

  const closeSuccessMessageESC = function (evt) {
    if (evt.key === `Escape`) {
      closeSuccessMessage();
    }
  };

  const closeSuccessMessageClick = function () {
    closeSuccessMessage();
  };

  const closeErrorMessage = function () {
    const message = document.querySelector(`.error`);
    message.remove();

    document.removeEventListener(`keydown`, closeErrorMessageESC);
    document.removeEventListener(`click`, closeErrorMessageClick);
  };
  const closeErrorMessageESC = function (evt) {
    if (evt.key === `Escape`) {
      closeErrorMessage();
    }
  };
  const closeErrorMessageClick = function () {
    closeErrorMessage();
  };

  const onLoad = function () {
    const message = successMessage.cloneNode(true);
    document.body.append(message);

    doInactiveAll();

    document.addEventListener(`click`, closeSuccessMessageClick);
    document.addEventListener(`keydown`, closeSuccessMessageESC);
  };

  const onError = function () {
    const message = errorMessage.cloneNode(true);
    const main = document.querySelector(`main`);

    main.append(message);

    document.addEventListener(`click`, closeErrorMessageClick);
    document.addEventListener(`keydown`, closeErrorMessageESC);
  };

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    const url = adForm.getAttribute(`action`);
    window.backend.send(new FormData(adForm), onLoad, onError, url);
  });


  const clearForm = adForm.querySelector(`.ad-form__reset`);
  clearForm.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    doInactiveAll();
  });

  window.form = {
    mapPinMain, getInactivePinCoords
  };
})();
