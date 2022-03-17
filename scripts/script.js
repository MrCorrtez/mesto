const editButton = document.querySelector('.profile__editButton');
const exitButton = document.querySelector('.popup__exitButton');
const saveButton = document.querySelector('.popup__saveButton');

const popup      =  document.querySelector('.popup');

const inputName       = document.querySelector('.popup__name');
const inputOccupation = document.querySelector('.popup__occupation');

const profileName       = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editProfile = () => {

  popup.classList.add('popup_opened');

  inputName.value       = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;

}

const exitProfile = () => {

  popup.classList.remove('popup_opened');

}

const formSubmitHandler = event => {

  event.preventDefault();

  profileName.textContent       = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  exitProfile();

}

const addCard = element => {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement  = cardTemplate.querySelector('.elements__element').cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = element.name;
  cardElement.querySelector('.elements__image').src = element.link;

  cardElement.querySelector('.elements__like').addEventListener('click', event => event.target.classList.toggle('elements__like_active'));
  cardElement.querySelector('.elements__deleteButton').addEventListener('click', event => event.target.closest('.elements__element').remove());

  return cardElement;

}

const initialRender = () => {

  const initialElements = initialCards.map(addCard);
  initialElements.forEach(element => elements.append(element));

}

initialRender();

editButton.addEventListener('click', editProfile);
exitButton.addEventListener('click', exitProfile);
popup.addEventListener('submit', formSubmitHandler);
