const editButton  = document.querySelector('.profile__editButton');
const addButton   = document.querySelector('.profile__addButton');
const saveButton  = document.querySelector('.popup__saveButton');
const exitButtons = document.querySelectorAll('.exitButton');

const popup       = document.querySelector('.popup');
const formBigCard = document.querySelector('.popup__big-card');
const formProfile = document.querySelector('.type_profile');
const formNewItem = document.querySelector('.type_new-item');

const inputName        = document.querySelector('.type_profile .popup__name');
const inputOccupation  = document.querySelector('.type_profile .popup__occupation');
const inputDescription = document.querySelector('.type_new-item .popup__name');
const inputLink        = document.querySelector('.type_new-item .popup__occupation');

const profileName       = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const bigCardImage   = document.querySelector('.popup__image')
const bigCardCaption = document.querySelector('.popup__caption')

const cardTemplate = document.querySelector('#card-template').content;
const cardTemplateNode = cardTemplate.querySelector('.elements__element');

const cardElements = document.querySelector('.elements');

const changeFormVisibility = form => {

  popup.classList.toggle('hidden');
  popup.classList.toggle('visible');
  form.classList.toggle('hidden');
  form.classList.toggle('visible');

}

const openProfileForm = () => {

  inputName.value       = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;

  changeFormVisibility(formProfile);

}

const openNewItemForm = () => {

  changeFormVisibility(formNewItem);

}

const openImageForm = evt => {

  bigCardImage.src           = evt.target.src;
  bigCardCaption.textContent = evt.target.alt;

  changeFormVisibility(formBigCard);

}

const exitForm = evt => {

  const evtForm = evt.target.closest('form');

  changeFormVisibility(evtForm);

}

const formProfileSubmitHandler = evt => {

  evt.preventDefault();

  profileName.textContent       = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  exitForm(evt);

}

const formNewItemSubmitHandler = evt => {

  evt.preventDefault();

  if (cardElements.children.length === 6) {
    cardElements.lastElementChild.remove();
  }

  const newElement = {name: inputDescription.value, link: inputLink.value};
  const newCard    = addCard(newElement);

  cardElements.prepend(newCard);

  exitForm(evt);

}

const addCard = element => {

  const cardElement  = cardTemplateNode.cloneNode(true);

  cardElement.querySelector('.elements__name').textContent = element.name;
  cardElement.querySelector('.elements__image').src        = element.link;
  cardElement.querySelector('.elements__image').alt         = element.name;

  cardElement.querySelector('.elements__like').addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
  cardElement.querySelector('.elements__deleteButton').addEventListener('click', evt => evt.target.closest('.elements__element').remove());
  cardElement.querySelector('.elements__image').addEventListener('click', openImageForm);

  return cardElement;

}

const initialRender = () => {

  const initialCards = [
    {
      name: 'Лондон',
      link: 'https://s3.nat-geo.ru/images/2019/4/10/b2580431d1fb410fa57d94a4c97a9213.max-1200x800.jpg'
    },
    {
      name: 'Канада',
      link: 'https://a.d-cd.net/fe84fbes-1920.jpg'
    },
    {
      name: 'Швейцария',
      link: 'https://dnpmag.com/wp-content/uploads/2016/06/718.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Тайланд',
      link: 'https://tourdv.ru/wp-content/uploads/2018/04/Tajland.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const initialElements = initialCards.map(addCard);
  initialElements.forEach(element => cardElements.append(element));

}

initialRender();

exitButtons.forEach(element => element.addEventListener('click', exitForm));
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openNewItemForm);
formProfile.addEventListener('submit', formProfileSubmitHandler);
formNewItem.addEventListener('submit', formNewItemSubmitHandler);
