'use strict';
(function () {
  var MAP_PIN_WIDTH = 40;
  var MAP_PIN_HEIGHT = 60;
  var mapSection = document.querySelector('.map');

  var removeMapCard = function () {
    var cardPopup = document.querySelector('.map__card');
    if (cardPopup) {
      cardPopup.remove();
    }
  };

  var removePins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
  };

  var removeMapFader = function () {
    mapSection.classList.remove('map--faded');
  };

  var addMapFader = function () {
    mapSection.classList.add('map--faded');
  };


  // Exports
  window.utils = {
    addMapFader: addMapFader,
    removeMapFader: removeMapFader,
    removePins: removePins,
    removeMapCard: removeMapCard,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
  };
})();
