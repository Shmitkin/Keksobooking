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
    photosArray.forEach(function (photo) {
      var anotherImg = photoElement.cloneNode(true);
      anotherImg.src = photo;
      containerElement.appendChild(anotherImg);
    });
    photoElement.remove();
  };

  var addPopUpFeatures = function (cardFeatures, card) {
    window.utils.CARD_FEATURES.forEach(function (feature) {
      if (cardFeatures.indexOf(feature) === -1) {
        card.querySelector('.popup__feature--' + feature).className = 'hidden';
      }
    });
  };

  //  Exports
  window.popup = {
    fillInfo: fillPopUpInfo
  };

})();
