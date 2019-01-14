'use strict';
(function () {

  var fillPopUpInfo = function (cardInfo) {
    var card = document.querySelector('#card').content.cloneNode(true);
    var priceNight = '\u20BD/ночь';
    card.querySelector('.popup__avatar').src = cardInfo.avatar;
    card.querySelector('.popup__title').textContent = cardInfo.offer.title;
    card.querySelector('.popup__text--address').textContent = cardInfo.offer.address;
    card.querySelector('.popup__text--price').textContent = cardInfo.offer.price + priceNight;
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
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      window.utils.removeMapCard();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        window.utils.removeMapCard();
      }
    });
  };

  var getRusCardType = function (TypeToTranslate) {
    var cardTypesTranslation = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      palace: 'Дворец',
      house: 'Дом'
    };
    return cardTypesTranslation[TypeToTranslate];
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
    var CARD_FEATURES = [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ];
    for (var i = 0; i < CARD_FEATURES.length; i++) {
      if (cardFeatures.indexOf(CARD_FEATURES[i]) === -1) {
        card.querySelector('.popup__feature--' + CARD_FEATURES[i]).className = 'hidden';
      }
    }
  };
  //  Exports
  window.popup = {
    fillPopUpInfo: fillPopUpInfo
  };

})();
