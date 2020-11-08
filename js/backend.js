'use strict';

(function () {
  const load = function (onLoad, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;

    const request = new XMLHttpRequest();
    request.responseType = `json`;

    request.addEventListener(`load`, function () {
      if (request.status === 200) {
        onLoad(request.response);
      } else {
        onError(request.statusText);
      }
    });

    request.addEventListener(`error`, function () {
      onError(request.statusText);
    });

    request.addEventListener(`timeout`, function () {
      onError(`Превышено время ожидания`);
    });

    request.open(`GET`, URL);
    request.send();
  };

  window.backend = {
    load
  };
})();
