'use strict';


const MAP_PIN_MAIN_HEIGHT = 84;

const map = window.main.map;
const mapPinMain = window.form.mapPinMain;

const addressInput = window.main.adForm.querySelector(`#address`);

window.map = {};

const getActivePinCoords = () => {
  const x = Math.round(mapPinMain.clientWidth / 2 + mapPinMain.offsetLeft);
  const y = parseInt(getComputedStyle(mapPinMain).top, 10) + MAP_PIN_MAIN_HEIGHT;

  return [x, y];
};

const onLoad = (response) => {
  window.map.pins = response;

  window.pin.renderPins(window.pin.createPins(response));
  window.util.enableAll(window.main.mapFiltersBlocks);
};

const doActiveAll = () => {
  map.classList.remove(`map--faded`);
  window.main.adForm.classList.remove(`ad-form--disabled`);
  window.util.enableAll(window.main.adFormFieldsets);
  window.backend.load(onLoad, window.util.createRedErrorMessage);

  addressInput.value = getActivePinCoords().join(`, `);
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    doActiveAll();
  }
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    doActiveAll();
  }
});

window.map = {
  mapPinMain, addressInput, getActivePinCoords, MAP_PIN_MAIN_HEIGHT
};

