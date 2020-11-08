'use strict';

(function () {
  const TYPES = {
    en: [`palace`, `flat`, `house`, `bungalow`],
    ru: [`Дворец`, `Квартира`, `Дом`, `Бунгало`]
  };

  window.data = {};

  const onLoad = function (response) {
    window.data[`offers`] = response;
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

    if (errorText.length === 0) {
      errorText = `Ошибка загрузки`;
    }
    element.textContent = errorText;

    document.body.append(element);

    window.data[`offers`] = [];
  };


  window.backend.load(onLoad, onError);

  window.data[`TYPES`] = TYPES;
})();
