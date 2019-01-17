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

  var loadPins = function () {
    var successHandler = function (data) {
      updateCards(data);
    };
    window.loadCardsInfo(successHandler);
  };

  var resetMap = function () {
    window.utils.removePins();
    window.utils.resetFormFields(mapFormFilters);
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
      filterCards(cards);
    });
    mapFilters.price.addEventListener('change', function () {
      filterCards(cards);
    });
    mapFilters.rooms.addEventListener('change', function () {
      filterCards(cards);
    });
    mapFilters.capacity.addEventListener('change', function () {
      filterCards(cards);
    });
    mapFilters.features.forEach(function (input) {
      input.addEventListener('change', function () {
        filterCards(cards);
      })
    })
    window.pin.renderPins(cards);
  };

  var filterCards = function (cards) {
    var cardsCopy = cards;
    var filterGuests = function (cards) {
      if (mapFilters.capacity.value !== 'any') {
      cardsCopy = cards.filter(it => it.offer.guests.toString() === mapFilters.capacity.value);
      console.log(cards);
      }
    }
    var filterType = function (cards) {
      if (mapFilters.type.value !== 'any') {
        cardsCopy = cards.filter(function (it) {
          return it.offer.type === mapFilters.type.value;
        });
      }
    }
    var filterRooms = function (cards) {
      if (mapFilters.rooms.value !== 'any') {
        cardsCopy = cards.filter(it => it.offer.rooms.toString() === mapFilters.rooms.value);
      }
    }
    var filerPrice = function (cards) {
      var priceFilter = {
        any: 'any',
        low: 'low',
        middle: 'middle',
        high: 'high'
      };
      if (mapFilters.price.value !== 'any') {
        if (mapFilters.price.value === priceFilter.low) {
          cardsCopy = cards.filter(it => it.offer.price < 10000);
        } else if (mapFilters.price.value === priceFilter.middle) {
          cardsCopy = cards.filter(it => it.offer.price >= 10000 && it.offer.price <= 50000);
        } else if (mapFilters.price.value === priceFilter.high) {
          cardsCopy = cards.filter(it => it.offer.price > 50000);
        }
      }
    }
    var filterFeatures = function (cards) {
      var cardsToFilter = cards;
      for (var i = 0; i < mapFilters.features.length; i++) {
        if (mapFilters.features[i].checked) {
          var someCards = cardsToFilter.filter(it => it.offer.features.includes(mapFilters.features[i].value));
          cardsToFilter = someCards;
        }
      }
      cardsCopy = cardsToFilter;
    }
    filterGuests(cardsCopy);
    filterType(cardsCopy);
    filterRooms(cardsCopy);
    filerPrice(cardsCopy);
    filterFeatures(cardsCopy);
    window.utils.removeMapCard();
    window.pin.renderPins(cardsCopy);
  }
  // Exports
  window.map = {
    loadPins: loadPins,
    resetMap: resetMap,
    addMapFader: addMapFader,
    removeMapFader: removeMapFader,
  };

})();
