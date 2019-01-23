'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFormFilters = map.querySelector('.map__filters');
  var mapFilters = {
    type: map.querySelector('#housing-type'),
    price: map.querySelector('#housing-price'),
    rooms: map.querySelector('#housing-rooms'),
    capacity: map.querySelector('#housing-guests'),
    features: map.querySelector('#housing-features').querySelectorAll('input')
  };

  window.utils.disableForm(mapFormFilters);

  var enableMapFilters = function () {
    window.utils.enableForm(mapFormFilters);
  };

  var loadPins = function () {
    var successHandler = function (data) {
      updateCards(data);
    };
    window.backend.load(successHandler, window.utils.errorHandler);
  };

  var resetMap = function () {
    window.utils.removePins();
    window.utils.resetFormFields(mapFormFilters);
    window.utils.disableForm(mapFormFilters);
    resetMainPin();
    window.utils.removeMapCard();
    addMapFader();
  };

  var resetMainPin = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = window.utils.MAIN_PIN_X + 'px';
    mainPin.style.top = window.utils.MAIN_PIN_Y + 'px';
  };

  var removeMapFader = function () {
    map.classList.remove('map--faded');
  };

  var addMapFader = function () {
    map.classList.add('map--faded');
  };

  var updateCards = function (cards) {
    mapFilters.type.addEventListener('change', function () {
      window.debounce(filterCards, cards);
    });
    mapFilters.price.addEventListener('change', function () {
      window.debounce(filterCards, cards);
    });
    mapFilters.rooms.addEventListener('change', function () {
      window.debounce(filterCards, cards);
    });
    mapFilters.capacity.addEventListener('change', function () {
      window.debounce(filterCards, cards);
    });
    mapFilters.features.forEach(function (input) {
      input.addEventListener('change', function () {
        window.debounce(filterCards, cards);
      });
    });
    window.pin.render(cards);
  };

  var filterCards = function (cardsFromLoad) {
    var cardsCopy = cardsFromLoad;
    var filterGuests = function (cards) {
      if (mapFilters.capacity.value !== 'any') {
        cardsCopy = cards.filter(function (it) {
          return it.offer.guests.toString() === mapFilters.capacity.value;
        });
      }
    };
    var filterType = function (cards) {
      if (mapFilters.type.value !== 'any') {
        cardsCopy = cards.filter(function (it) {
          return it.offer.type === mapFilters.type.value;
        });
      }
    };
    var filterRooms = function (cards) {
      if (mapFilters.rooms.value !== 'any') {
        cardsCopy = cards.filter(function (it) {
          return it.offer.rooms.toString() === mapFilters.rooms.value;
        });
      }
    };
    var filterPrice = function (cards) {
      var prices = {
        low: 10000,
        high: 50000
      };
      if (mapFilters.price.value !== 'any') {
        if (mapFilters.price.value === 'low') {
          cardsCopy = cards.filter(function (it) {
            return it.offer.price < prices.low;
          });
        } else if (mapFilters.price.value === 'middle') {
          cardsCopy = cards.filter(function (it) {
            return it.offer.price >= prices.low && it.offer.price <= prices.high;
          });
        } else if (mapFilters.price.value === 'high') {
          cardsCopy = cards.filter(function (it) {
            return it.offer.price > prices.high;
          });
        }
      }
    };
    var filterFeatures = function (cards) {
      var filteredCards = cards;
      mapFilters.features.forEach(function (filter) {
        if (filter.checked) {
          var cardsToFilter = filteredCards.filter(function (it) {
            return it.offer.features.includes(filter.value);
          });
          filteredCards = cardsToFilter;
        }
      });
      cardsCopy = filteredCards;
    };

    filterGuests(cardsCopy);
    filterType(cardsCopy);
    filterRooms(cardsCopy);
    filterPrice(cardsCopy);
    filterFeatures(cardsCopy);
    window.utils.removeMapCard();
    window.pin.render(cardsCopy);
  };
  // Exports
  window.map = {
    loadPins: loadPins,
    reset: resetMap,
    removeFader: removeMapFader,
    enableFilters: enableMapFilters
  };

})();
