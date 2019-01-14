'use strict';
(function () {
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;
  var form = document.querySelector('.ad-form');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var successMessage = document.querySelector('.success');
  var title = form.querySelector('#title');
  var submit = form.querySelector('.ad-form__submit');
  var formFeatures = document.querySelector('.features');
  var description = form.querySelector('#description');
  var typeHouseMatchPrice = {
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
    'bungalo': 0
  };

  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    var formHeader = form.querySelector('.ad-form-header');
    formHeader.disabled = true;
    var formElement = form.querySelectorAll('.ad-form__element');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].disabled = true;
    }
    document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
  };
  disableForm();

  var enableForm = function () {
    window.utils.removeMapFader();
    form.classList.remove('ad-form--disabled');
    var formHeader = form.querySelector('.ad-form-header');
    formHeader.disabled = false;
    var formElement = form.querySelectorAll('.ad-form__element');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].disabled = false;
    }
  };

  var selectDefault = function (select) {
    for (var i = 0; i < select.length; i++) {
      if (select[i].defaultSelected === true) {
        select.value = select[i].value;
      }
    }
  };

  var uncheckFeatures = function (fieldset) {
    var inputs = fieldset.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
  };

  var resetValue = function (input) {
    input.value = '';
  };

  var resetForm = function () {
    resetValue(price);
    resetValue(title);
    resetValue(description);
    selectDefault(type);
    selectDefault(timein);
    selectDefault(timeout);
    selectDefault(roomNumber);
    selectDefault(capacity);
    uncheckFeatures(formFeatures);
    price.placeholder = typeHouseMatchPrice[type.value];
    price.min = typeHouseMatchPrice[type.value];
    disableForm();
  };

  var resetMapFilters = function () {
    var mapForm = document.querySelector('.map__filters');
    selectDefault(mapForm.querySelector('#housing-type'));
    selectDefault(mapForm.querySelector('#housing-price'));
    selectDefault(mapForm.querySelector('#housing-rooms'));
    selectDefault(mapForm.querySelector('#housing-guests'));
    uncheckFeatures(mapForm.querySelector('#housing-features'));
  };

  var resetMap = function () {
    window.utils.removePins();
    resetMapFilters();
    resetMainPin();
    window.utils.removeMapCard();
    window.utils.addMapFader();
  };

  var resetMainPin = function () {
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';
  };

  // Синхронизация времени выезда/заезда
  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });
  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  // Проверка типа жилья и цены
  type.addEventListener('change', function () {
    var typeOfHouse = type.value;
    price.min = typeHouseMatchPrice[typeOfHouse];
    price.placeholder = price.min;
  });

  // Кнопка опубликовать
  submit.addEventListener('click', function () {
    if (title.validity.valid === true && price.validity.valid === true) {
      successMessage.classList.remove('hidden');
      resetForm();
      resetMap();
    }
    successMessage.addEventListener('click', function () {
      successMessage.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt1) {
      if (evt1.keyCode === 27) {
        successMessage.classList.add('hidden');
      }
    });
  });

  // Кнопка сброса
  var resetButton = form.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
    resetMap();
  });
  // Exports
  window.form = {
    enableForm: enableForm
  };
})();
