'use strict';

(function () {
  const MAP_PIN_MAIN_HEIGHT = 84;

  const map = window.main.map;
  const mapPinMain = window.form.mapPinMain;

  const addressInput = window.main.adForm.querySelector(`#address`);

  const getActivePinCoords = function () {
    const x = Math.round(mapPinMain.clientWidth / 2 + mapPinMain.offsetLeft);
    const y = parseInt(getComputedStyle(mapPinMain).top, 10) + MAP_PIN_MAIN_HEIGHT;

    return [x, y];
  };

  const onLoad = function (response) {
    window.pin.renderPins(window.pin.createPins(response));
  };

  const onError = function (errorText) {
    const element = document.createElement(`div`);

    element.style.position = `absolute`;
    element.style.top = `0`;
    element.style.left = `0`;
    element.style.backgroundColor = `red`;
    element.style.textAlign = `center`;
    element.style.width = `100%`;
    element.style.height = `40px`;
    element.style.lineHeight = `40px`;
    element.style.color = `white`;

    if (errorText.length === 0) {
      errorText = `Ошибка загрузки`;
    }
    element.textContent = errorText;

    document.body.append(element);
  };

  const doActiveAll = function () {
    map.classList.remove(`map--faded`);
    window.main.adForm.classList.remove(`ad-form--disabled`);
    window.util.enableAll(window.main.adFormFieldsets);
    window.util.enableAll(window.main.mapFiltersBlocks);
    window.backend.load(onLoad, onError);

    addressInput.value = getActivePinCoords().join(`, `);
  };

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      doActiveAll();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      doActiveAll();
    }
  });

  window.map = {
    mapPinMain, addressInput, getActivePinCoords, MAP_PIN_MAIN_HEIGHT
  };
})();
