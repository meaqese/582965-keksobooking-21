'use strict';

const PRICE = {
  low: 10000,
  high: 50000
};

const filters = window.main.mapFilters;

const updatePins = window.debounce((newPins) => {
  window.pin.renderPins(window.pin.createPins(newPins));

  window.util.hideCard(window.main.map);
});

filters.addEventListener(`change`, () => {
  const form = new FormData(filters);

  const houseType = form.get(`housing-type`);
  const price = form.get(`housing-price`);
  const rooms = form.get(`housing-rooms`);
  const guests = form.get(`housing-guests`);
  const features = form.getAll(`features`);

  const filteredPins = window.map.pins.filter((data) => {
    const offer = data.offer;

    const byType = offer.type === houseType || houseType === `any`;
    const byPrice = () => {
      switch (price) {
        case `any`:
          return true;
        case `middle`:
          return offer.price >= PRICE.low && offer.price <= PRICE.high;
        case `low`:
          return offer.price < PRICE.low;
        case `high`:
          return offer.price > PRICE.high;
        default:
          return false;
      }
    };
    const byRooms = offer.rooms === window.parseInt(rooms) || rooms === `any`;
    const byGuests = offer.guests === window.parseInt(guests) || guests === `any`;
    const byFeatures = window.util.intersection(offer.features, features).length === features.length || features.length === 0;

    return byType && byPrice() && byRooms && byGuests && byFeatures;
  });

  updatePins(filteredPins);
});

window.filters = {
  filters
};

