//Функция случайного числа
var randomInteger = function (min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

//Функция перемешивания элементов массива 
var shuffleArray = function (a, b) {
	return Math.random() - 0.5;
}


// Массив названий карточки
var cardTitle = [
	'Большая уютная квартира', 
	'Маленькая неуютная квартира',
	'Огромный прекрасный дворец',
	'Маленький ужасный дворец',
	'Красивый гостевой домик',
	'Некрасивый негостеприимный домик',
	'Уютное бунгало далеко от моря',
	'Неуютное бунгало по колено в воде'
]

//Массив преимуществ
var cardFeatures = [
	'wifi',
	'dishwasher',
	'parking',
	'washer',
	'elevator',
	'conditioner'
]

//Функция массива преимсуществ
var cardFeaturesInfo = function (featuresNumber) {
	cardFeatures.sort(shuffleArray);
	var featuresList = '';
	for (var i = 0; i < featuresNumber; i++) {
		if (i === featuresNumber - 1) {
			featuresList += cardFeatures[i];
		} else {
			featuresList += cardFeatures[i] + ','; 
		}
		} 
		
	
	return featuresList;
}

//Массив для фотографий
var cardPhotos = [
	'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
	'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
	'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
]

//Функция фотографий в случайном порядке 
var cardPhotosInfo = function () {
	cardPhotos.sort(shuffleArray);
	return cardPhotos;
}


//Массив для номеров фоторгафий аватарок
var photoNumber = [1,2,3,4,5,6,7,8];

//Массив для типа жилья

var cardType = ['palace', 'flat', 'house', 'bungalo'];

//Массив для времени заезда и выезда

var cardCheckIn = ['12:00', '13:00', '14:00'];

//Перемешиваем все массивы перед началом работы программы
cardTitle.sort(shuffleArray);
photoNumber.sort(shuffleArray);
cardType.sort(shuffleArray);
cardCheckIn.sort(shuffleArray);

// Создаем массив карточек
var cardList = [{},{},{},{},{},{},{},{}];

//Создаем обьект карточки
var cardInfo = {
	location: {
		x:'',
		y:''}
	}

//Конструктор обьектов карточки
var Author = function (cardNumber) {
		this.avatar = ('img/avatars/user0' + photoNumber[cardNumber] + '.png');
	}

var Offer = function (cardNumber) {
		this.title = cardTitle[cardNumber],
		this.address = cardList[cardNumber].location.x + ', ' + cardList[cardNumber].location.y,
		this.price = randomInteger(1000, 1000000),
		this.type =cardType[randomInteger(1,4) - 1],
		this.rooms =randomInteger(1, 5),
		this.guests =randomInteger(2, 20),
		this.checkin = cardCheckIn[randomInteger(1,3) - 1],
		this.checkout =cardCheckIn[randomInteger(1,3) - 1],
		this.features = cardFeaturesInfo(randomInteger(1,5)),
		this.description ='',
		this.photos = cardPhotosInfo() //Почему-то перемешивает 1 раз только
	}
var Location = function (cardNumber) {
		this.x = randomInteger(50, 1000),
		this.y = randomInteger (130, 630)
	}

//Функция заполнения карточки и записи в массив
// Не получается записывать обьекты в пустой массив :(((
cardRender = function (cardsNumber) {
for (var i = 0; i < cardsNumber; i++) {
	cardList[i].location = new Location(i)
	cardList[i].author = new Author(i);
	cardList[i].offer = new Offer(i);
	
}
}
//СОздаем карточки
var cardsNumber = 8;
cardRender(cardsNumber);


//Удаляем класс map--faded

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');


//Ищем элемент куда будем вставлять метку
var mapPins = document.querySelector('.map__pins');

/*
//Клонирование элемента
// Ищу элемент который буду копировать
var mapPin = document.querySelector('#pin')
	.content
	.querySelector('.map__pin');
//Ищу элемент метки куда писать название и олписание
var mapPinImg = mapPin.getElementsByTagName('img');
//Добавляю Элемент в разметку и заполняю его
for (var i = 0; i < cardsNumber; i++) {
	mapPin.style.left = cardList[i].location.x - 20 + 'px';
	mapPin.style.top = cardList[i].location.y - 60 + 'px';
	mapPinImg[0].setAttribute('src', cardList[i].author.avatar);
	mapPinImg[0].setAttribute('alt', cardList[i].offer.title)
	var similarMapPin = mapPin.cloneNode(true);
	mapPins.appendChild(similarMapPin);
	
};
*/

//Создаем элемент через СОЗДАНИЕ
var pinsCreation = function (pinsNumber) {
var pinFragment = document.createDocumentFragment();
// Создаем элемент, заполняем, записываем в фрагмент
for (var i = 0; i < pinsNumber; i++) {
	var pinElement = document.createElement('button');
	pinElement.className = 'map__pin';
	pinElement.style.left = cardList[i].location.x - 20 + 'px';
	pinElement.style.top = cardList[i].location.y - 60 + 'px';
	pinElement.innerHTML = '<img src="' 
		+ cardList[i].author.avatar 
		+ '"' 
		+ 'width="40" height="40" draggable="false" alt="' 
		+ cardList[i].offer.title 
		+ '">';
	pinFragment.appendChild(pinElement);
}
//Вставляем наш фрагмент
mapPins.appendChild(pinFragment);
}
/*
//Присваиваем русское значение типу жилья
cardTypeToRus = function () {
	if (cardList[0].offer.type = 'palace') {'Дворец'} else
		if (cardList[0].offer.type = 'flat') {'Квартира'} else
			if (cardList[0].offer.type = 'house') {'Дом'} else
				if (cardList[0].offer.type = 'bungalo') {'Бунгало'}
}
console.log(cardList[0].offer.type);
*/

//Создаем элемент карточки на основе наших данных
var renderCardElement = function (j) {
	var cardElement = document.createElement('article');
		cardElement.className = 'map__card popup';

	var cardElementImg = document.createElement('img');
		cardElementImg.className = 'popup__avatar';
		cardElementImg.src = cardList[0].author.avatar;
		cardElementImg.width = '70';
		cardElementImg.height = '70';
		cardElementImg.alt = 'Аватар пользователя';

	var cardElementButton = document.createElement('button');
		cardElementButton.type = 'button';
		cardElementButton.className = 'popup__close';
		cardElementButton.innerHTML = 'Закрыть';

	var cardElementTitle = document.createElement('h3');
		cardElementTitle.className = 'popup__title';
		cardElementTitle.innerHTML =  cardList[0].offer.title;

	var cardElementAddress = document.createElement('p');
		cardElementAddress.className = 'popup__text popup__text--address';
		cardElementAddress.innerHTML = cardList[0].offer.address;

	var cardElementPrice = document.createElement('p');
		cardElementPrice.className = 'popup__text popup__text--price';
		cardElementPrice.innerHTML = cardList[0].offer.price + '&#x20bd;<span>/ночь</span>';

	var cardElementType = document.createElement('h4');
		cardElementType.className = 'popup__type';
		cardElementType.innerHTML = cardList[0].offer.type;  // - перевести

	var cardElementCapacity = document.createElement('p');
		cardElementCapacity.className = 'popup__text popup__text--capacity';
		cardElementCapacity.innerHTML = cardList[0].offer.rooms 
			+ ' комнаты для ' 
			+ cardList[0].offer.guests 
			+ ' гостей';

	var cardElementTime = document.createElement('p');
		cardElementTime.className = 'popup__text popup__text--time';
		cardElementTime.innerHTML = 'Заезд после ' 
			+ cardList[0].offer.checkin 
			+ ', выезд до ' 
			+ cardList[0].offer.checkout;

	var cardElementFeatures = document.createElement('ul');
		cardElementFeatures.className = 'popup__features';
		// разбиваем строку в массив
		cardFeaturesArray = cardList[0].offer.features.split(',');
		for (var i = 0; i < cardFeaturesArray.length; i++) {
			var cardElementFeature = document.createElement('li');
			cardElementFeature.className = 'popup__feature popup__feature--' + cardFeaturesArray[i];
			cardElementFeatures.appendChild(cardElementFeature);
		}

	var cardElementDescription = document.createElement('p');
		cardElementDescription.className = 'popup__description';
		cardElementDescription.innerHTML = cardList[0].offer.description;

	var cardElementPhotos = document.createElement('div');
		for (var i = 0; i < cardList[0].offer.photos.length; i++) {
			var cardElementPhoto = document.createElement('img');
			cardElementPhoto.className = 'popup__photo';
			cardElementPhoto.width = '45';
			cardElementPhoto.height = '40';
			cardElementPhoto.alt = 'Фотография жилья';
			cardElementPhoto.src = cardList[0].offer.photos[i];
			cardElementPhotos.appendChild(cardElementPhoto);
		}

	//Сборка карточки
	cardElement.appendChild(cardElementImg);
	cardElement.appendChild(cardElementButton);
	cardElement.appendChild(cardElementTitle);
	cardElement.appendChild(cardElementAddress);
	cardElement.appendChild(cardElementPrice);
	cardElement.appendChild(cardElementType);
	cardElement.appendChild(cardElementCapacity);
	cardElement.appendChild(cardElementTime);
	cardElement.appendChild(cardElementFeatures);
	cardElement.appendChild(cardElementDescription);
	cardElement.appendChild(cardElementPhotos);


	//вставляем в ДОМ карточку
	document.querySelector('.map').appendChild(cardElement);
}
//console.log(cardList[0].offer.photos[1]);



//Вызываем отрисовку страницы
pinsCreation(8);
renderCardElement();



