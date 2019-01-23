'use strict';
(function () {
  var mainPinHandle = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var address = document.querySelector('#address');

  mainPinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var MainPinLimits = {
        top: window.utils.MAP_LIMIT_TOP - window.utils.MAP_PIN_HEIGHT,
        left: window.utils.MAP_LIMIT_LEFT,
        right: map.clientWidth - window.utils.MAP_PIN_WIDTH,
        bottom: window.utils.MAP_LIMIT_BOTTOM
      };
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPinHandle.style.top = (mainPinHandle.offsetTop - shift.y) + 'px';
      mainPinHandle.style.left = (mainPinHandle.offsetLeft - shift.x) + 'px';

      if (mainPinHandle.offsetTop - shift.y > MainPinLimits.bottom) {
        mainPinHandle.style.top = MainPinLimits.bottom + 'px';
      }
      if (mainPinHandle.offsetTop - shift.y < MainPinLimits.top) {
        mainPinHandle.style.top = MainPinLimits.top + 'px';
      }
      if (mainPinHandle.offsetLeft - shift.x < MainPinLimits.left) {
        mainPinHandle.style.left = MainPinLimits.left + 'px';
      }
      if (mainPinHandle.offsetLeft - shift.x > MainPinLimits.right) {
        mainPinHandle.style.left = MainPinLimits.right + 'px';
      }
      fillAddressInput(mainPinHandle.style.left, mainPinHandle.style.top);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      checkPins();
    };

    var fillAddressInput = function (clientX, clientY) {
      var x = parseInt(clientX, 10) + window.utils.MAP_PIN_WIDTH / 2;
      var y = parseInt(clientY, 10) + window.utils.MAP_PIN_HEIGHT;
      address.value = x + ', ' + y;
    };

    var checkPins = function () {
      if (map.classList.contains('map--faded')) {
        window.map.loadPins();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
