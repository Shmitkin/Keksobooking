'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomsNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var avatarChooser = form.querySelector('#avatar');
  var avatarPreview = form.querySelector('.ad-form-header__preview').querySelector('img');
  var photoChooser = form.querySelector('#images');
  var photoPreviewContainer = form.querySelector('.ad-form__photo-container');
  var photoSample = photoPreviewContainer.querySelector('.ad-form__photo');
  var photoPreview = document.querySelector('#photo_preview').content.querySelector('.ad-form__photo__preview');
  var typeHouseMatchPrice = {
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
    'bungalo': 0
  };

  var enablePage = function () {
    window.map.removeMapFader();
    window.utils.enableForm(form);
    form.classList.remove('ad-form--disabled');
    window.map.enableMapFilters();
  };

  var resetForm = function () {
    window.utils.resetFormFields(form);
    price.placeholder = typeHouseMatchPrice[type.value];
    price.min = typeHouseMatchPrice[type.value];
    window.utils.disableForm(form);
    form.classList.add('ad-form--disabled');
    document.querySelector('#address').value = window.utils.MAIN_PIN_X + ', ' + window.utils.MAIN_PIN_Y;
    avatarPreview.src = 'img/muffin-grey.svg';
    compareRoomsCapacity();
    removePhotosPreviews();
  };

  var successHandler = function () {
    var successMessage = document.querySelector('.success');
    successMessage.classList.remove('hidden');
    resetForm();
    window.map.resetMap();
    successMessage.addEventListener('click', function () {
      successMessage.classList.add('hidden');
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC_KEYCODE) {
        successMessage.classList.add('hidden');
      }
    });
  };

  var compareRoomsCapacity = function () {
    var capacityOptions = capacity.querySelectorAll('option');
    var roomsCapacity = {
      '1': ['1'],
      '2': ['2', '1'],
      '3': ['3', '2', '1'],
      '100': ['0']
    };
    capacityOptions.forEach(function (option) {
      if (roomsCapacity[roomsNumber.value].includes(option.value)) {
        option.disabled = false;
      } else {
        option.disabled = true;
      }
    });
    capacity.value = roomsCapacity[roomsNumber.value][0];
  };

  var addPhotosPreviews = function (chooser) {
    var photosPreviews = document.createDocumentFragment();
    for (var i = 0; i < chooser.files.length; i++) {
      var photoPreviewCopy = photoPreview.cloneNode(true);
      var img = photoPreviewCopy.querySelector('img');
      window.utils.prewievImage(photoChooser.files[i], img);
      photosPreviews.appendChild(photoPreviewCopy);
    }
    if (photoSample) {
      photoSample.remove();
    }
    photoPreviewContainer.appendChild(photosPreviews);
  };

  var removePhotosPreviews = function () {
    var previews = form.querySelectorAll('.ad-form__photo__preview');
    if (previews.length > 0) {
      previews.forEach(function (preview) {
        preview.remove();
      });
      photoPreviewContainer.appendChild(photoSample);
    }
  };

  resetForm();
  compareRoomsCapacity();

  avatarChooser.addEventListener('change', function () {
    window.utils.prewievImage(avatarChooser.files[0], avatarPreview);
  });

  photoChooser.addEventListener('change', function () {
    addPhotosPreviews(photoChooser);
  });

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

  // Синхронизация комнат и гостей
  roomsNumber.addEventListener('change', function () {
    compareRoomsCapacity();
  });

  // Кнопка опубликовать
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), successHandler, window.utils.errorHandler);
  });

  // Кнопка сброса
  form.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resetForm();
    window.map.resetMap();
  });
  // Exports
  window.form = {
    enablePage: enablePage
  };
})();

