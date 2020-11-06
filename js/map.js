'use strict';

(function () {
  const map = window.main.map;
  const mapPin = window.form.mapPin;
  const mapPinAfter = getComputedStyle(mapPin, `::after`);

  const addressInput = window.main.adForm.querySelector(`#address`);

  const getActivePinCoords = function () {
    const x = Math.round(mapPin.clientWidth / 2 + mapPin.offsetLeft);
    const y = parseInt(getComputedStyle(mapPin).top, 10) + mapPin.clientHeight + parseInt(mapPinAfter.height, 10);

    return [x, y];
  };

  const doActiveAll = function () {
    map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    window.util.enableAll(window.main.adFormFieldsets);
    window.util.enableAll(window.main.mapFiltersBlocks);
    window.pin.renderPins(window.pin.createPins(window.data.offers));

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

  window.map = {
    mapPin
  };
})();
