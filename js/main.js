'use strict';
var CARD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CARD_CHECK_INS = ['12:00', '13:00', '14:00'];
var CARD_COUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_ROOMS_COUNT = 5;
var MAX_GUESTS = 20;
var MIN_X_POSITION = 50;
var MAX_X_POSITION = 1000;
var MIN_Y_POSITION = 130;
var MAX_Y_POSITION = 630;
var MAP_PIN_WIDTH = 40;
var MAP_PIN_HEIGHT = 60;
var CARD_POPUP_NUMBER = 0;
var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 375;
var CARD_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var CARD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var CARD_PHOTOS_COUNT = 3;

var createPhotoLinks = function (numberOfPhotos) {
  var photoLinks = [];
  for (var i = 1; i < numberOfPhotos + 1; i++) {
    photoLinks.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photoLinks;
};

var CARD_PHOTOS = createPhotoLinks(CARD_PHOTOS_COUNT);

var createAvatarLinks = function (numberOfAvatarLinks) {
  var photoNumbers = [];
  for (var i = 1; i < numberOfAvatarLinks + 1; i++) {
    photoNumbers.push('img/avatars/user0' + i + '.png');
  }
  return photoNumbers;
};

var CARD_AVATAR_LINKS = createAvatarLinks(CARD_COUNT);

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComparison = function () {
  return Math.random() - 0.5;
};

var getSortedArrayClone = function (arrayToClone) {
  var arrayCopy = arrayToClone.slice();
  arrayCopy.sort(getRandomComparison);
  return arrayCopy;
};

var getCardFeatures = function (featuresToList) {
  var cardFeaturesCopy = getSortedArrayClone(CARD_FEATURES);
  var featuresList = cardFeaturesCopy.splice(featuresToList - 1);
  return featuresList;
};

var getRusCardType = function (TypeToTranslate) {
  var cardTypesRus = TypeToTranslate;
  if (cardTypesRus === 'flat') {
    cardTypesRus = 'Квартира';
  } else if (cardTypesRus === 'bungalo') {
    cardTypesRus = 'Бунгало';
  } else if (cardTypesRus === 'palace') {
    cardTypesRus = 'Дворец';
  } else if (cardTypesRus === 'house') {
    cardTypesRus = 'Дом';
  }
  return cardTypesRus;
};


var getCardsList = function (cardsNumber) {
  var cardsList = [];
  var cardTitles = getSortedArrayClone(CARD_TITLES);
  var cardTypes = getSortedArrayClone(CARD_TYPES);
  var cardCheckIns = getSortedArrayClone(CARD_CHECK_INS);
  var cardAvatarLinks = getSortedArrayClone(CARD_AVATAR_LINKS);
  for (var i = 0; i < cardsNumber; i++) {
    var cardPhotos = getSortedArrayClone(CARD_PHOTOS);
    var cardLocation = {
      x: getRandomInteger(MIN_X_POSITION, MAX_X_POSITION),
      y: getRandomInteger(MIN_Y_POSITION, MAX_Y_POSITION),
    };
    var cardOffers = {
      title: cardTitles[i],
      address: cardLocation.x + ', ' + cardLocation.y,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: cardTypes[getRandomInteger(1, CARD_TYPES.length - 1)],
      rooms: getRandomInteger(1, MAX_ROOMS_COUNT),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: cardCheckIns[getRandomInteger(1, cardCheckIns.length - 1)],
      checkout: cardCheckIns[getRandomInteger(1, cardCheckIns.length - 1)],
      features: getCardFeatures(getRandomInteger(1, CARD_FEATURES.length)),
      description: '',
      photos: cardPhotos,
    };
    var cardInfo = {
      avatar: cardAvatarLinks[i],
      offer: cardOffers,
      location: cardLocation
    };
    cardsList.push(cardInfo);
  }
  return cardsList;
};

var removeMapFader = function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.remove('map--faded');
};

var createPins = function (cards) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  for (var i = 0; i < cards.length; i++) {
    var anotherPin = mapPin.cloneNode(true);
    var mapPinImg = anotherPin.querySelector('img');
    anotherPin.style.left = cards[i].location.x - (MAP_PIN_WIDTH / 2) + 'px';
    anotherPin.style.top = cards[i].location.y - MAP_PIN_HEIGHT + 'px';
    mapPinImg.src = cards[i].avatar;
    mapPinImg.alt = cards[i].offer.title;
    document.querySelector('.map__pins').appendChild(anotherPin);
  }
};

var removePins = function () {
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].remove();
  }
};

var createPopUpInfo = function (card) {
  fillPopUpInfo(card);
};

var addPopUpPhotos = function (containerElement, photoElement, photosArray) {
  photoElement.src = photosArray[0];
  for (var i = 1; i < photosArray.length; i++) {
    var anotherImg = photoElement.cloneNode(true);
    anotherImg.src = photosArray[i];
    containerElement.appendChild(anotherImg);
  }
};

var addPopUpFeatures = function (cardFeatures, card) {
  for (var i = 0; i < CARD_FEATURES.length; i++) {
    if (cardFeatures.indexOf(CARD_FEATURES[i]) === -1) {
      card.querySelector('.popup__feature--' + CARD_FEATURES[i]).className = 'hidden';
    }
  }
};

var fillPopUpInfo = function (cardInfo) {
  var card = document.querySelector('#card').content.cloneNode(true);
  card.querySelector('.popup__avatar').src = cardInfo.avatar;
  card.querySelector('.popup__title').textContent = cardInfo.offer.title;
  card.querySelector('.popup__text--address').textContent = cardInfo.offer.address;
  card.querySelector('.popup__text--price').innerHTML = cardInfo.offer.price + '&#x20bd;<span>/ночь</span>';
  card.querySelector('.popup__type').textContent = getRusCardType(cardInfo.offer.type);
  card.querySelector('.popup__text--capacity').textContent = cardInfo.offer.rooms
    + ' комнаты для '
    + cardInfo.offer.guests
    + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после '
    + cardInfo.offer.checkin
    + ', выезд до '
    + cardInfo.offer.checkout;

  addPopUpPhotos(card.querySelector('.popup__photos'), card.querySelector('.popup__photo'), cardInfo.offer.photos);
  addPopUpFeatures(cardInfo.offer.features, card);

  document.querySelector('.map').appendChild(card);
};

var renderMapInfo = function () {
  var cardsList = getCardsList(CARD_COUNT);
  enableForm();
  removePins();
  createPins(cardsList);
  /*
  // Сделать чтобы появлялся нужная карточка
  var mapPinClick = document.querySelectorAll('.map__pin');
  for (var i = 1; i < mapPinClick.length; i++) {
    mapPinClick[i].addEventListener('click', function (evt) {
    var pinImg = (this.querySelector('img'));
    console.log(this);
    });
  }; */
};


var disableForm = function () {
  var form = document.querySelector('.ad-form');
  var formHeader = form.querySelector('.ad-form-header');
  formHeader.disabled = true;
  var formElement = form.querySelectorAll('.ad-form__element');
  for (var i = 0; i < formElement.length; i++) {
    formElement[i].disabled = true;
  }
  document.querySelector('#address').value = MAIN_PIN_X + ', ' + MAIN_PIN_Y;
};

var enableForm = function () {
  removeMapFader();
  var form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  var formHeader = form.querySelector('.ad-form-header');
  formHeader.disabled = false;
  var formElement = form.querySelectorAll('.ad-form__element');
  for (var i = 0; i < formElement.length; i++) {
    formElement[i].disabled = false;
  }
};

disableForm();

var fillAddressInput = function (clientX, clientY) {
  var x = clientX.split('px').join('') - MAP_PIN_WIDTH / 2;
  var y = clientY.split('px').join('') - MAP_PIN_HEIGHT;

  var address = document.querySelector('#address');
  address.value = x + ', ' + y;
};


var mainPinHandle = document.querySelector('.map__pin--main');
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
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    fillAddressInput(mainPinHandle.style.left, mainPinHandle.style.top);
    renderMapInfo();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Валидация(синхронизация) времени заезда и выезда
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
timein.addEventListener('click', function (evt){
  timeout.value = timein.value;
});
timeout.addEventListener('click', function (evt) {
  timein.value = timeout.value
});

// Проверка типа жилья и цены
var type = document.querySelector('#type');
var price = document.querySelector('#price');
type.addEventListener('click', function (evt) {
  if (type.value === 'flat') {
    price.min = 1000;
    price.placeholder = '1000'
  } else if (type.value === 'house') {
    price.min = 5000;
    price.placeholder = '5000';
  } else if (type.value === 'palace') {
    price.min = 10000;
    price.placeholder = '10000';
  } else if (type.value === 'bungalo') {
    price.min = 0;
    price.placeholder = '0';
  }
})