'use strict';

(function () {
  const addRequestListeners = function (request, onLoad, onError) {
    request.addEventListener(`load`, () => {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError(request.statusText);
      }
    });

    request.addEventListener(`error`, () => {
      onError(request.statusText);
    });

    request.addEventListener(`timeout`, () => {
      onError(`Превышено время ожидания`);
    });
  };

  const load = function (onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;

    const request = new XMLHttpRequest();
    request.responseType = `json`;

    addRequestListeners(request, onLoad, onError);

    request.open(`GET`, URL);
    request.send();
  };

  const send = function (data, onLoad, onError, url) {
    const request = new XMLHttpRequest();

    addRequestListeners(request, onLoad, onError);

    request.open(`POST`, url);
    request.send(data);
  };

  window.backend = {
    load, send
  };
})();
