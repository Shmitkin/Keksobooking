'use strict';

(function () {

  var CARD_COUNT = 8;
  var createPin = function (cardPin) {
    var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
    var anotherPin = mapPin.cloneNode(true);
    var mapPinImg = anotherPin.querySelector('img');
    anotherPin.style.left = cardPin.location.x - (window.utils.MAP_PIN_WIDTH / 2) + 'px';
    anotherPin.style.top = cardPin.location.y - window.utils.MAP_PIN_HEIGHT + 'px';
    mapPinImg.src = cardPin.avatar;
    mapPinImg.alt = cardPin.offer.title;
    anotherPin.addEventListener('click', function () {
      window.utils.removeMapCard();
      window.popup.fillPopUpInfo(cardPin);
    });
    return anotherPin;
  };

  var renderPins = function () {
    var map = document.querySelector('.map');
    var fragment = document.createDocumentFragment();
    var cardsList = window.card.cardsList(CARD_COUNT);
    window.form.enableForm();
    window.utils.removePins();
    for (var i = 0; i < cardsList.length; i++) {
      fragment.appendChild(createPin(cardsList[i]));
    }
    map.appendChild(fragment);
  };


  // Exports
  window.pin = {
    renderPins: renderPins
  };

})();
