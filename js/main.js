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
var CARD_PHOTOS_COUNT = 3;

var createPhotoLinks = function (numberOfPhotos) {
  var photoLinks = [];
  for (var i = 1; i < numberOfPhotos + 1; i++) {
    photoLinks.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return photoLinks;
};

var CARD_PHOTOS = createPhotoLinks(CARD_PHOTOS_COUNT);

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

var createAvatarPhotoNumbers = function (numberOfAvatarPhotos) {
  var photoNumbers = [];
  for (var i = 1; i < numberOfAvatarPhotos + 1; i++) {
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


var getCardsList = function (cardsNumber) {
  var cardsList = [];
  var cardTitles = getSortedArrayClone(CARD_TITLES).sort(getRandomComparison);
  var cardTypes = getSortedArrayClone(CARD_TYPES).sort(getRandomComparison);
  var cardCheckIns = getSortedArrayClone(CARD_CHECK_INS).sort(getRandomComparison);
  var cardPhotoNumbers = createAvatarPhotoNumbers(CARD_COUNT).sort(getRandomComparison);
  for (var i = 0; i < cardsNumber; i++) {
    var cardPhotos = getSortedArrayClone(CARD_PHOTOS).sort(getRandomComparison);
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


var removeMapFader = function () {
  var mapSection = document.querySelector('.map');
  mapSection.classList.remove('map--faded');
};

var renderPage = function () {
  var cardsList = getCardsList(CARD_COUNT);

  var createPins = function (pinsNumber) {
    var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
    var mapPinImg = mapPin.getElementsByTagName('img')[0];
    for (var i = 0; i < pinsNumber; i++) {
      mapPin.style.left = cardsList[i].location.x - (MAP_PIN_WIDTH / 2) + 'px';
      mapPin.style.top = cardsList[i].location.y - MAP_PIN_HEIGHT + 'px';
      mapPinImg.src = cardsList[i].avatar;
      mapPinImg.setAttribute('alt', cardsList[i].offer.title);
      var anotherPin = mapPin.cloneNode(true);
      document.querySelector('.map__pins').appendChild(anotherPin);
    }
  };

  var createPopUpInfo = function (cardNumber) {
    var RusCardType = getRusCardType(cardsList[cardNumber].offer.type);
    fillPopUpInfo(
        cardsList[cardNumber].avatar,
        cardsList[cardNumber].offer.title,
        cardsList[cardNumber].offer.address,
        cardsList[cardNumber].offer.price,
        RusCardType,
        cardsList[cardNumber].offer.rooms,
        cardsList[cardNumber].offer.guests,
        cardsList[cardNumber].offer.checkin,
        cardsList[cardNumber].offer.checkout,
        cardsList[cardNumber].offer.photos,
        cardsList[cardNumber].offer.features
    );
  };

  var fillPopUpInfo = function (avatar, title, address, price, type, rooms, guests, checkIn, checkOut, photos, features) {
    var card = document.querySelector('#card').content.cloneNode(true);
    card.querySelector('.popup__avatar').src = avatar;
    card.querySelector('.popup__title').textContent = title;
    card.querySelector('.popup__text--address').textContent = address;
    card.querySelector('.popup__text--price').innerHTML = price + '&#x20bd;<span>/ночь</span>';
    card.querySelector('.popup__type').textContent = type;
    card.querySelector('.popup__text--capacity').textContent = rooms
    + ' комнаты для '
    + guests
    + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после '
    + checkIn
    + ', выезд до '
    + checkOut;

    card.querySelector('.popup__photo').src = photos[0];
    for (var i = 1; i < photos.length; i++) {
      var anotherImg = card.querySelector('.popup__photo').cloneNode(true);
      anotherImg.src = photos[i];
      card.querySelector('.popup__photos').appendChild(anotherImg);
    }

    if (features.indexOf('wifi') === -1) {
      card.querySelector('.popup__feature--wifi').className = 'hidden';
    }
    if (features.indexOf('dishwasher') === -1) {
      card.querySelector('.popup__feature--dishwasher').className = 'hidden';
    }
    if (features.indexOf('parking') === -1) {
      card.querySelector('.popup__feature--parking').className = 'hidden';
    }
    if (features.indexOf('washer') === -1) {
      card.querySelector('.popup__feature--washer').className = 'hidden';
    }
    if (features.indexOf('elevator') === -1) {
      card.querySelector('.popup__feature--elevator').className = 'hidden';
    }
    if (features.indexOf('conditioner') === -1) {
      card.querySelector('.popup__feature--conditioner').className = 'hidden';
    }
    document.querySelector('.map').appendChild(card);
  };
  removeMapFader();
  createPins(CARD_COUNT);
  createPopUpInfo(CARD_POPUP_NUMBER);

};


renderPage();

