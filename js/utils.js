'use strict';
(function () {
  var MAP_PIN_WIDTH = 40;
  var MAP_PIN_HEIGHT = 60;
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var ESC_KEYCODE = 27;

  var removeMapCard = function () {
    var cardPopup = document.querySelector('.map__card');
    var activePin =document.querySelector('.map__pin--active');
    if (cardPopup) {
      cardPopup.remove();
      activePin.classList.remove('map__pin--active');
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
    var formTextareas = formToReset.querySelectorAll('textarea');

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

    formTextareas.forEach(function (textarea) {
      textarea.value = '';
    });
  };

  var disableForm = function (formToDisable) {
    var formInputs = formToDisable.querySelectorAll('input:not([type="checkbox"])');
    var formSelects = formToDisable.querySelectorAll('select');
    var formCheckboxes = formToDisable.querySelectorAll('[type="checkbox"]');
    var formTextareas = formToDisable.querySelectorAll('textarea');

    formInputs.forEach(function (input) {
      input.disabled = true;
    });

    formCheckboxes.forEach(function (checkbox) {
      checkbox.disabled = true;
    });

    formSelects.forEach(function (select) {
      select.disabled = true;
    });

    formTextareas.forEach(function (textarea) {
      textarea.disabled = true;
    });
  };

  var enableForm = function (formToEnable) {
    var formInputs = formToEnable.querySelectorAll('input:not([type="checkbox"])');
    var formSelects = formToEnable.querySelectorAll('select');
    var formCheckboxes = formToEnable.querySelectorAll('[type="checkbox"]');
    var formTextareas = formToEnable.querySelectorAll('textarea');

    formInputs.forEach(function (input) {
      input.disabled = false;
    });

    formCheckboxes.forEach(function (checkbox) {
      checkbox.disabled = false;
    });

    formSelects.forEach(function (select) {
      select.disabled = false;
    });

    formTextareas.forEach(function (textarea) {
      textarea.disabled = false;
    });
  };


  var errorHandler = function (message) {
    var errorContainer = document.querySelector('.error');
    var errorMessage = errorContainer.querySelector('.server__response');
    var errorButton = errorContainer.querySelector('.error__button');
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

    errorButton.addEventListener('click', function () {
      errorContainer.classList.add('hidden');
    });
  };

  // Exports
  window.utils = {
    resetFormFields: resetFormFields,
    disableForm: disableForm,
    enableForm: enableForm,
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
