'use strict';

const STATUS_CODE = {
  ok: 200
};

const newRequest = (onLoad, onError) => {
  const request = new XMLHttpRequest();

  request.addEventListener(`load`, () => {
    if (request.status === STATUS_CODE.ok) {
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

  return request;
};

const load = (onLoad, onError) => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const request = newRequest(onLoad, onError);
  request.responseType = `json`;

  request.open(`GET`, URL);
  request.send();
};

const send = (data, onLoad, onError, url) => {
  const request = newRequest(onLoad, onError);

  request.open(`POST`, url);
  request.send(data);
};

window.backend = {
  load, send
};

