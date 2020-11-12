'use strict';

(function () {
  const filters = window.main.Filt;

  const houseTypeInput = filters.querySelector(`#housing-type`);
  houseTypeInput.addEventListener(`change`, function () {
    const filteredPins = window.map.pins.filter((data) => data.offer.type === houseTypeInput.value);

    window.pin.renderPins(
        window.pin.createPins(filteredPins)
    );
  });

  window.filters = {
    filters
  };
})();
