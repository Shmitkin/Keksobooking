'use strict';
(function () {
  var mainPinHandle = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var LIMITS_MAIN_PIN = {
    top: 130 - window.utils.MAP_PIN_HEIGHT,
    left: 0,
    right: map.clientWidth - window.utils.MAP_PIN_WIDTH,
    bottom: 630
  };

  mainPinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
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

      if (mainPinHandle.offsetTop - shift.y > LIMITS_MAIN_PIN.bottom) {
        mainPinHandle.style.top = LIMITS_MAIN_PIN.bottom + 'px';
      } else if (mainPinHandle.offsetTop - shift.y < LIMITS_MAIN_PIN.top) {
        mainPinHandle.style.top = LIMITS_MAIN_PIN.top + 'px';
      }
      if (mainPinHandle.offsetLeft - shift.x < LIMITS_MAIN_PIN.left) {
        mainPinHandle.style.left = LIMITS_MAIN_PIN.left + 'px';
      } else if (mainPinHandle.offsetLeft - shift.x > LIMITS_MAIN_PIN.right) {
        mainPinHandle.style.left = LIMITS_MAIN_PIN.right + 'px';
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
      var address = document.querySelector('#address');
      address.value = x + ', ' + y;
    };

    var checkPins = function () {
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (mapPins.length <= 0) {
        window.map.loadPins();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
