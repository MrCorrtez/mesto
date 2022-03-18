const editButton = document.querySelector('.profile__editButton');
const saveButton = document.querySelector('.popup__saveButton');
const exitButton = document.querySelectorAll('.exitButton');

const popup        = document.querySelector('.popup');
const popupBigCard = document.querySelector('.popup__big-card');
const popupProfile = document.querySelector('.popup__container');

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

const openProfile = () => {

  popup.classList.remove('hidden');
  popupProfile.classList.remove('hidden');

  inputName.value       = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;

}

const exitPopup = evt => {

  evt.target.closest('form').classList.add('hidden');
  popup.classList.add('hidden');

}

const formSubmitHandler = evt => {

  evt.preventDefault();

  profileName.textContent       = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  exitPopup(evt);

}

const openImagePopup = evt => {

  const bigCardImage = document.querySelector('.popup__image')

  popup.classList.remove('hidden');
  popupBigCard.classList.remove('hidden');
  bigCardImage.src = evt.target.src;

}

const addCard = element => {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement  = cardTemplate.querySelector('.elements__element').cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = element.name;
  cardElement.querySelector('.elements__name').alt = element.name;
  cardElement.querySelector('.elements__image').src = element.link;

  cardElement.querySelector('.elements__like').addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
  cardElement.querySelector('.elements__deleteButton').addEventListener('click', evt => evt.target.closest('.elements__element').remove());
  cardElement.querySelector('.elements__image').addEventListener('click', openImagePopup);

  return cardElement;

}

const initialRender = () => {

  const initialElements = initialCards.map(addCard);
  initialElements.forEach(element => elements.append(element));

}

initialRender();

exitButton.forEach(element => element.addEventListener('click', exitPopup));
editButton.addEventListener('click', openProfile);
popupProfile.addEventListener('submit', formSubmitHandler);
