'use strict';

(function () {

  var createPin = function (card) {
    var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
    var anotherPin = mapPin.cloneNode(true);
    var mapPinImg = anotherPin.querySelector('img');
    anotherPin.style.left = card.location.x - (window.utils.MAP_PIN_WIDTH / 2) + 'px';
    anotherPin.style.top = card.location.y - window.utils.MAP_PIN_HEIGHT + 'px';
    mapPinImg.src = card.author.avatar;
    mapPinImg.alt = card.offer.title;
    anotherPin.addEventListener('click', function () {
      window.utils.removeMapCard();
      window.popup.fillPopUpInfo(card);
    });
    return anotherPin;
  };

  var renderPins = function () {
    window.loadCardsInfo(function (cards) {
      var map = document.querySelector('.map');
      var fragment = document.createDocumentFragment();
      window.form.enableForm();
      window.utils.removePins();
      for (var i = 0; i < cards.length; i++) {
        fragment.appendChild(createPin(cards[i]));
      }
      map.appendChild(fragment);
    });
  };


  // Exports
  window.pin = {
    renderPins: renderPins
  };

})();
