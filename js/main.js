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
var CARD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComparison = function () {
  return Math.random() - 0.5;
};

var getArrayClone = function (arrayToClone) {
  var arrayCopy = arrayToClone.slice();
  arrayCopy.sort(getRandomComparison);
  return arrayCopy;
};

var getCardFeatures = function (featuresNumber) {
  var cardFeaturesCopy = getArrayClone(CARD_FEATURES);
  var featuresList = cardFeaturesCopy.splice(featuresNumber - 1);
  return featuresList;
};

var createPhotoNumbers = function (numberOfPhotos) {
  var photoNumbers = [];
  for (var i = 1; i < numberOfPhotos + 1; i++) {
    photoNumbers.push(i);
  }
  return photoNumbers;
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

var cardTitles = getArrayClone(CARD_TITLES).sort(getRandomComparison);
var cardTypes = getArrayClone(CARD_TYPES).sort(getRandomComparison);
var cardPhotos = getArrayClone(CARD_PHOTOS).sort(getRandomComparison);
var cardCheckIns = getArrayClone(CARD_CHECK_INS).sort(getRandomComparison);
var cardPhotoNumbers = createPhotoNumbers(CARD_COUNT).sort(getRandomComparison);

var getCardsList = function (cardsNumber) {
  var cardsList = [];
  for (var i = 0; i < cardsNumber; i++) {
    var cardLocation = {
      x: getRandomInteger(MIN_X_POSITION, MAX_X_POSITION),
      y: getRandomInteger(MIN_Y_POSITION, MAX_Y_POSITION),
    };
    var cardOffers = {
      title: cardTitles[i],
      address: cardLocation.x + ', ' + cardLocation.y,
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: cardTypes[getRandomInteger(1, CARD_TYPES.length) - 1],
      rooms: getRandomInteger(1, MAX_ROOMS_COUNT),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: cardCheckIns[getRandomInteger(1, cardCheckIns.length) - 1],
      checkout: cardCheckIns[getRandomInteger(1, cardCheckIns.length) - 1],
      features: getCardFeatures(getRandomInteger(1, CARD_FEATURES.length)),
      description: '',
      photos: cardPhotos,
    };
    var cardInfo = {
      avatar: 'img/avatars/user0' + cardPhotoNumbers[i] + '.png',
      offer: cardOffers,
      location: cardLocation
    };
    cardsList.push(cardInfo);
  }
  return cardsList;
};

var cardsList = getCardsList(CARD_COUNT);

var removeMapFader = function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.remove('map--faded');
};

var mapPins = document.querySelector('.map__pins');

var pinsCreation = function (pinsNumber) {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < pinsNumber; i++) {
    var pinElement = document.createElement('button');
    pinElement.className = 'map__pin';
    pinElement.style.left = cardsList[i].location.x - (MAP_PIN_WIDTH / 2) + 'px';
    pinElement.style.top = cardsList[i].location.y - MAP_PIN_HEIGHT + 'px';
    pinElement.innerHTML = '<img src="'
      + cardsList[i].avatar
      + '"'
      + 'width="40" height="40" draggable="false" alt="'
      + cardsList[i].offer.title
      + '">';
    pinFragment.appendChild(pinElement);
  }
  mapPins.appendChild(pinFragment);
};

var createPopUpInfo = function (cardNumber) {
  var card = document.querySelector('#card').content.cloneNode(true);
  card.querySelector('.popup__avatar').src = cardsList[cardNumber].avatar;
  card.querySelector('.popup__title').innerHTML = cardsList[cardNumber].offer.title;
  card.querySelector('.popup__text--address').innerHTML = cardsList[cardNumber].offer.address;
  card.querySelector('.popup__text--price').innerHTML = cardsList[cardNumber].offer.price + '&#x20bd;<span>/ночь</span>';
  card.querySelector('.popup__type').innerHTML = getRusCardType(cardsList[cardNumber].offer.type);
  card.querySelector('.popup__text--capacity').innerHTML = cardsList[cardNumber].offer.rooms
  + ' комнаты для '
  + cardsList[cardNumber].offer.guests
  + ' гостей';
  card.querySelector('.popup__text--time').innerHTML = 'Заезд после '
  + cardsList[cardNumber].offer.checkin
  + ', выезд до '
  + cardsList[cardNumber].offer.checkout;
  card.querySelector('.popup__photo').src = cardsList[cardNumber].offer.photos[0];
  for (var i = 1; i < cardsList[cardNumber].offer.photos.length; i++) {
    var anotherImg = card.querySelector('.popup__photo').cloneNode(true);
    anotherImg.src = cardsList[cardNumber].offer.photos[i];
    card.querySelector('.popup__photos').appendChild(anotherImg);
  }
  document.querySelector('.map').appendChild(card);
};
removeMapFader();
pinsCreation(CARD_COUNT);
createPopUpInfo(CARD_POPUP_NUMBER);
