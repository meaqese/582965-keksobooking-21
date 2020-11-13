'use strict';

const MAP_BOUNDARY = {
  top: 130,
  right: 1200,
  bottom: 630,
  left: 0
};

const map = window.main.map;
const mapPinMain = window.form.mapPinMain;
const mapPinMainCenter = Math.round(mapPinMain.clientWidth / 2);

mapPinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  if (evt.button === 0) {
    const onMouseMove = (moveEvt) => {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const mapPinCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (mapPinCoords.y + window.map.MAP_PIN_MAIN_HEIGHT <= MAP_BOUNDARY.bottom && mapPinCoords.y + window.map.MAP_PIN_MAIN_HEIGHT > MAP_BOUNDARY.top) {
        mapPinMain.style.top = (mapPinCoords.y) + `px`;
      }
      if (mapPinCoords.x + mapPinMainCenter >= MAP_BOUNDARY.left && mapPinCoords.x + mapPinMainCenter <= MAP_BOUNDARY.right) {
        mapPinMain.style.left = (mapPinCoords.x) + `px`;
      }

      window.map.addressInput.value = window.map.getActivePinCoords().join(`, `);
    };

    const onMouseUp = () => {
      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);

      window.map.addressInput.value = window.map.getActivePinCoords().join(`, `);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);
  }
});

