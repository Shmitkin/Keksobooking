'use strict';
(function () {
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
    document.querySelector('#address').value = window.utils.MAIN_PIN_X + ', ' + window.utils.MAIN_PIN_Y;
  };
  disableForm();

  var enableForm = function () {
    window.map.removeMapFader();
    form.classList.remove('ad-form--disabled');
    var formHeader = form.querySelector('.ad-form-header');
    formHeader.disabled = false;
    var formElement = form.querySelectorAll('.ad-form__element');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].disabled = false;
    }
  };

  var resetForm = function () {
    window.utils.resetFormFields(form);
    price.placeholder = typeHouseMatchPrice[type.value];
    price.min = typeHouseMatchPrice[type.value];
    disableForm();
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
      window.map.resetMap();
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
    window.map.resetMap();
  });
  // Exports
  window.form = {
    enableForm: enableForm
  };
})();

