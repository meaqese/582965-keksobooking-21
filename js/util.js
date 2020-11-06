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
    while (parentNode.lastElementChild) {
      parentNode.removeChild(parentNode.lastElementChild);
    }
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

  window.util = {
    getRandRange, getRandElement, clearAllElements, clearAllChildren,
    disableAll, enableAll
  };
})();
