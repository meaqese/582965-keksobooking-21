'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`);
  const mapFiltersBlocks = mapFilters.querySelectorAll(`select, fieldset`);

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  window.util.disableAll(adFormFieldsets);
  window.util.disableAll(mapFiltersBlocks);

  window.main = {
    map, adForm, adFormFieldsets, mapFiltersBlocks, mapFilters
  };
})();
