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
    var sameType = [];
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
    var cardsFiltered = function (similar) {
      window.pin.renderPins(similar);
    }
      
  window.pin.renderPins(cards);
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
