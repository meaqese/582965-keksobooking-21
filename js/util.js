'use strict';

(function () {
  const getRandRange = function (min, max) {
    return Math.round(min + (Math.random() * (max - min)));
  };

  const getRandElement = function (array, inclusive = false) {
    const max = (inclusive === false) ? array.length - 1 : array.length;
    return array[getRandRange(0, max)];
  };

  const clearAllElements = function (selector, parent = document) {
    const elements = parent.querySelectorAll(selector);

    for (let element of elements) {
      element.remove();
    }
  };

  const clearAllChildren = function (parentNode) {
    parentNode.innerHTML = ``;
  };

  const disableAll = function (elements = HTMLAllCollection) {
    for (let element of elements) {
      element.disabled = true;
    }
  };

  const enableAll = function (elements = HTMLAllCollection) {
    for (let element of elements) {
      element.disabled = false;
    }
  };

  const clearAllPins = function (mapPins) {
    window.util.clearAllElements(`.map__pin:not(.map__pin--main)`, mapPins);
  };

  const hideCard = function (map) {
    window.util.clearAllElements(`.map__card`, map);
  };

  const intersection = function (array1, array2) {
    const intersectionArray = [];

    for (let elem of array1) {
      if (array2.includes(elem)) {
        intersectionArray.push(elem);
      }
    }

    return intersectionArray;
  };

  window.util = {
    getRandRange, getRandElement, clearAllElements, clearAllChildren,
    disableAll, enableAll, clearAllPins, hideCard, intersection
  };
})();
