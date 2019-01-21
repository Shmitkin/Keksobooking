'use strict';
(function () {

  var fillPopUpInfo = function (card) {
    var popupCard = document.querySelector('#card').content.cloneNode(true);
    var priceNight = '\u20BD/ночь';
    popupCard.querySelector('.popup__avatar').src = card.author.avatar;
    popupCard.querySelector('.popup__title').textContent = card.offer.title;
    popupCard.querySelector('.popup__text--address').textContent = card.offer.address;
    popupCard.querySelector('.popup__text--price').textContent = card.offer.price + priceNight;
    popupCard.querySelector('.popup__type').textContent = getRusCardType(card.offer.type);
    popupCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms
      + ' комнаты для '
      + card.offer.guests
      + ' гостей';
    popupCard.querySelector('.popup__text--time').textContent = 'Заезд после '
      + card.offer.checkin
      + ', выезд до '
      + card.offer.checkout;
    addPopUpPhotos(popupCard.querySelector('.popup__photos'), popupCard.querySelector('.popup__photo'), card.offer.photos);
    addPopUpFeatures(card.offer.features, popupCard);
    document.querySelector('.map').appendChild(popupCard);

    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', window.utils.removeMapCard);
    document.addEventListener('keydown', window.utils.escPopupEvent);
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
    if (photosArray.length === 0) {
      containerElement.innerHTML = '';
      return;
    }
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
