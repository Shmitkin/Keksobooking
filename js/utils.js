'use strict';
(function () {
  var MAP_PIN_WIDTH = 40;
  var MAP_PIN_HEIGHT = 60;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var ESC_KEYCODE = 27;

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

  var resetFormFields = function (formToReset) {
    var formInputs = formToReset.querySelectorAll('input:not([type="checkbox"])');
    var formSelects = formToReset.querySelectorAll('select');
    var formCheckboxes = formToReset.querySelectorAll('[type="checkbox"]');

    formInputs.forEach(function (input) {
      input.value = '';
    });

    formCheckboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });

    formSelects.forEach(function (select) {
      for (var i = 0; i < select.length; i++) {
        if (select[i].defaultSelected === true) {
          select.value = select[i].value;
        }
      }
    });
  };

  var errorHandler = function (message) {
    var errorContainer = document.querySelector('.error');
    var errorMessage = errorContainer.querySelector('.server__response');
    errorMessage.textContent = message;
    errorContainer.classList.remove('hidden');
    errorContainer.addEventListener('click', function () {
      errorContainer.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        errorContainer.classList.add('hidden');
      }
    });

  };

  // Exports
  window.utils = {
    resetFormFields: resetFormFields,
    removePins: removePins,
    removeMapCard: removeMapCard,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    ESC_KEYCODE: ESC_KEYCODE,
    errorHandler: errorHandler
  };
})();
