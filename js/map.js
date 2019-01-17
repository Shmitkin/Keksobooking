'use strict';

(function () {

  var cards = [];
  var map = document.querySelector('.map');
  var mapFormFilters = map.querySelector('.map__filters');

  var loadPins = function () {
    var successHandler = function (data) {
      cards = data;
      updateCards(cards);
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

  var updateCards = function (cardsToUpdate) {
    var mapFilters = {
      type: map.querySelector('#housing-type'),
      price: map.querySelector('#housing-price'),
      rooms: map.querySelector('#housing-rooms'),
      capacity: map.querySelector('#housing-guests'),
      features: map.querySelector('#housing-features').querySelectorAll('input')
    };

    var priceFilter = {
      any: 'any',
      low: 'low',
      middle: 'middle',
      high: 'high'
    };

    var sameType = cardsToUpdate;
    var samePrice = cardsToUpdate;
    var sameRooms = cardsToUpdate;
    var sameCapacity = cardsToUpdate;
    console.log(cardsToUpdate);

    // фильтр типа жилья
    mapFilters.type.addEventListener('change', function () {
      if (mapFilters.type.value === 'any') {
        sameType = cardsToUpdate;
      } else {
        sameType = cardsToUpdate.filter(function (it) {
          return it.offer.type === mapFilters.type.value;
        });
      }
      applyFilters();
    });

    // фильтр по цене
    mapFilters.price.addEventListener('change', function () {
      if (mapFilters.price.value === priceFilter.any) {
        samePrice = cardsToUpdate;
      } else if (mapFilters.price.value === priceFilter.low) {
        samePrice = cardsToUpdate.filter(it => it.offer.price < 10000);
      } else if (mapFilters.price.value === priceFilter.middle) {
        samePrice = cardsToUpdate.filter(it => it.offer.price >= 10000 && it.offer.price <= 50000);
      } else if (mapFilters.price.value === priceFilter.high) {
        samePrice = cardsToUpdate.filter(it => it.offer.price > 50000);
      }
      applyFilters();
    });

    // фильтр по количеству комнат
    mapFilters.rooms.addEventListener('change', function () {
      if (mapFilters.rooms.value === 'any') {
        sameRooms = cardsToUpdate;
      } else {
        sameRooms = cardsToUpdate.filter(it => it.offer.rooms.toString() === mapFilters.rooms.value);
      }
      applyFilters();
    });

    // фильтр по количеству гостей
    mapFilters.capacity.addEventListener('change', function () {
      if (mapFilters.capacity.value === 'any') {
        sameCapacity = cardsToUpdate;
      } else {
        sameCapacity = cardsToUpdate.filter(it => it.offer.guests.toString() === mapFilters.capacity.value);
      }
      applyFilters();
    });

    var applyFilters = function () {
      var cardsNew = [];
      var cardsMinLengthArray = [];
      var cardsFiltered = [];
      var uniqueCards = [];
      var cardsTotal = [];
      cardsNew.push(sameType);
      cardsNew.push(samePrice);
      cardsNew.push(sameRooms);
      cardsNew.push(sameCapacity);
      cardsNew.sort();
      cardsMinLengthArray = cardsNew[0];
      for (var i = 0; i < cardsMinLengthArray.length; i++) {
        cardsNew.forEach(function (array) {
          if (array.includes(cardsMinLengthArray[i])) {
            cardsFiltered.push(cardsMinLengthArray[i]);
          }
        });
        if (cardsFiltered.length === 4) {
          var newСardsTotal = cardsTotal.concat(cardsFiltered);
          cardsTotal = newСardsTotal;
          cardsFiltered = [];
        } else {
          cardsFiltered = [];
        }
      }
      uniqueCards = cardsTotal.filter(function (it, k) {
        return cardsTotal.indexOf(it) === k;
      });
      window.utils.removeMapCard();
      window.pin.renderPins(uniqueCards);
    };
    window.pin.renderPins(cardsToUpdate);
  };

  // Exports
  window.map = {
    loadPins: loadPins,
    resetMap: resetMap,
    addMapFader: addMapFader,
    removeMapFader: removeMapFader,
  };

})();
