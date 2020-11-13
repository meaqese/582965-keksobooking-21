'use strict';


const getRandRange = (min, max) => {
  return Math.round(min + (Math.random() * (max - min)));
};

const getRandElement = (array, inclusive = false) => {
  const max = (inclusive === false) ? array.length - 1 : array.length;
  return array[getRandRange(0, max)];
};

const clearAllElements = (selector, parent = document) => {
  const elements = parent.querySelectorAll(selector);

  for (let element of elements) {
    element.remove();
  }
};

const clearAllChildren = (parentNode) => {
  parentNode.innerHTML = ``;
};

const disableAll = (elements = HTMLAllCollection) => {
  for (let element of elements) {
    element.disabled = true;
  }
};

const enableAll = (elements = HTMLAllCollection) => {
  for (let element of elements) {
    element.disabled = false;
  }
};

const clearAllPins = (mapPins) => {
  window.util.clearAllElements(`.map__pin:not(.map__pin--main)`, mapPins);
};

const hideCard = (map) => {
  window.util.clearAllElements(`.map__card`, map);
};

const intersection = (array1, array2) => {
  const intersectionArray = [];

  for (let elem of array1) {
    if (array2.includes(elem)) {
      intersectionArray.push(elem);
    }
  }

  return intersectionArray;
};

const createRedErrorMessage = (errorText) => {
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

  setTimeout(() => {
    element.remove();
  }, 10000);
};

window.util = {
  getRandRange, getRandElement, clearAllElements, clearAllChildren,
  disableAll, enableAll, clearAllPins, hideCard, intersection, createRedErrorMessage
};

