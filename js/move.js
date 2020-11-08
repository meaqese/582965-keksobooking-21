'use strict';

(function () {
  const map = window.main.map;
  const mapPinMain = window.form.mapPinMain;
  const mapPinMainCenter = Math.round(mapPinMain.clientWidth / 2);

  mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
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

      if (mapPinCoords.y + window.map.MAP_PIN_MAIN_HEIGHT <= 630 && mapPinCoords.y + window.map.MAP_PIN_MAIN_HEIGHT >= 130) {
        mapPinMain.style.top = (mapPinCoords.y) + `px`;
      }
      if (mapPinCoords.x + mapPinMainCenter >= 0 && mapPinCoords.x + mapPinMainCenter <= 1200) {
        mapPinMain.style.left = (mapPinCoords.x) + `px`;
      }

      window.map.addressInput.value = window.map.getActivePinCoords().join(`, `);
    };

    const onMouseUp = function () {
      map.removeEventListener(`mousemove`, onMouseMove);
      map.removeEventListener(`mouseup`, onMouseUp);

      window.map.addressInput.value = window.map.getActivePinCoords().join(`, `);
    };

    map.addEventListener(`mousemove`, onMouseMove);
    map.addEventListener(`mouseup`, onMouseUp);
  });
})();
