'use strict';


const DEBOUNCE_TIMEOUT = 500;

window.debounce = function (callback) {
  let lastTimeout = null;

  return (...params) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => callback(...params), DEBOUNCE_TIMEOUT);
  };
};

