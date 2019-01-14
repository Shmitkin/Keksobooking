'use strict';

(function () {
  var CARD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CARD_CHECK_INS = ['12:00', '13:00', '14:00'];
  var CARD_COUNT = 8;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MAX_ROOMS_COUNT = 5;
  var MAX_GUESTS = 20;
  var MIN_X_POSITION = 50;
  var MAX_X_POSITION = 800;
  var MIN_Y_POSITION = 130;
  var MAX_Y_POSITION = 630;
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
  window.card = {
    cardsList: getCardsList
  };
})();
