'use strict';

(function () {
  const adForm = window.main.adForm;

  const mapPin = window.main.map.querySelector(`.map__pin--main`);

  const getInactivePinCoords = function () {
    const mapPinStyles = getComputedStyle(mapPin);

    const x = Math.round(parseInt(mapPinStyles.left, 10) + parseInt(mapPinStyles.width, 10) / 2);
    const y = Math.round(mapPin.clientHeight / 2 + mapPin.offsetTop);

    return [x, y];
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

  window.form = {
    mapPin
  };
})();
