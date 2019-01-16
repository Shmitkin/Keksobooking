'use strict';

(function () {

  var cards = [];
  var map = document.querySelector('.map');
  var mapFormFilters = map.querySelector('.map__filters');
  var mapFilters = {
    type: map.querySelector('#housing-type'),
    price: map.querySelector('#housing-price'),
    rooms: map.querySelector('#housing-rooms'),
    capacity: map.querySelector('#housing-guests'),
    features: map.querySelector('#housing-features').querySelectorAll('input')
  }

  var loadPins = function () {
    var successHandler = function (data) {
      cards = data;
      updateCards(cards);
    };
    window.loadCardsInfo(successHandler, console.log);
  };

  var resetMainPin = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
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
  	var newCards = [];
    var sameType = [];
    var sameRooms = [];
    var sameCapacity = [];
        mapFilters.features.forEach(function (input) {
      input.addEventListener('change', function () {
        console.log(input.value);
      })
    })
    //фильтр типа
    mapFilters.type.addEventListener('change', function () {
      sameType = cards.filter(function(it){
        return it.offer.type === mapFilters.type.value;
      })
      if (mapFilters.type.value === 'any') {
        sameType = cards;
      }
      cardsFiltered(sameType);
    })


    // фильтр комнат
    mapFilters.rooms.addEventListener('change', function () {
      sameRooms = cards.filter(function(it){
        return it.offer.rooms == mapFilters.rooms.value;
      })
      if (mapFilters.rooms.value === 'any') {
        sameRooms = cards;
      }
      cardsFiltered(sameRooms);
    })

    //фильтр гостей
    mapFilters.capacity.addEventListener('change', function () {
      sameCapacity = cards.filter(function(it){
        return it.offer.guests == mapFilters.capacity.value;
      })
      if (mapFilters.capacity.value === 'any') {
        sameCapacity = cards;
      }
      cardsFiltered(sameCapacity);
    })


    var cardsFiltered = function (similar) {
      var cardsArray = cards;
      var filtered = [];
      if (cardsArray.length >= similar.length) {
        for(var i = 0; i < similar.length; i++) {
          if (cardsArray.includes(similar[i])) {
            filtered.push(similar[i]);
          }
        }
      } else {
          for(var i = 0; i < newCards.length; i++) {
            if (newCards.includes(similar[i])) {
              filtered.push(similar[i]);
            }
          }
        }
        newCards = filtered;
        console.log(newCards);
    }
      
  window.pin.renderPins(cards);
  console.log(cards);

  }



 // console.log(mapFilters);
  // Exports
  window.map = {
  	loadPins: loadPins,
    resetMap: resetMap,
    addMapFader: addMapFader,
    removeMapFader: removeMapFader,



  }
})();
