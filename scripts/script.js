const editButton  = document.querySelector('.profile__editButton');
const addButton   = document.querySelector('.profile__addButton');
const saveButton  = document.querySelector('.popup__saveButton');

const popup       = document.querySelector('.popup');
const formBigCard = document.querySelector('.popup__big-card');
const formProfile = document.querySelector('.type_profile');
const formNewItem = document.querySelector('.type_new-item');

const inputName        = document.querySelector('.type_profile .popup__input_type_line-one');
const inputOccupation  = document.querySelector('.type_profile .popup__input_type_line-two');
const inputDescription = document.querySelector('.type_new-item .popup__input_type_line-one');
const inputLink        = document.querySelector('.type_new-item .popup__input_type_line-two');

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

  checkInputValidity(inputName);
  checkInputValidity(inputOccupation);

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

  let formElement;

  if (evt.target.classList.contains("popup")||evt.key==="Escape") {
    formElement = popup.querySelector('.visible');
  }

  if (evt.target.classList.contains("exitButton")||evt.target.type==='submit') {
    formElement = evt.target.closest('form');
  }

  if (formElement) {
    changeFormVisibility(formElement);
  }
}

const formProfileSubmitHandler = evt => {

  evt.preventDefault();

  profileName.textContent       = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  exitForm(evt);

}

const formNewItemSubmitHandler = evt => {

  evt.preventDefault();

  addCardToDB();
  exitForm(evt);

}

const addCard = element => {

  const cardElement  = cardTemplateNode.cloneNode(true);

  cardElement.id = element.id;

  cardElement.querySelector('.elements__name').textContent = element.name;
  cardElement.querySelector('.elements__image').src        = element.link;
  cardElement.querySelector('.elements__image').alt         = element.name;

  cardElement.querySelector('.elements__like').addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
  cardElement.querySelector('.elements__deleteButton').addEventListener('click', removeCard);
  cardElement.querySelector('.elements__image').addEventListener('click', openImageForm);

  return cardElement;

}

const removeCard = evt => {

  const element = evt.target.closest('.elements__element')

  const request = new XMLHttpRequest();

  request.open("DELETE",  'http://127.0.0.1:3002/cards/' + element.id, true);

  request.onload = function () {
    if(request.readyState === XMLHttpRequest.DONE) {
      refreshCards();
    };
  };

  request.send(null);

}

const refreshCards = () => {

  const request = new XMLHttpRequest();

  request.open('GET', 'http://127.0.0.1:3002/cards', true);

  request.onload = function () {

    let initialCards = [];

    const data = JSON.parse(this.response);

    data.forEach(record => {
      initialCards.push({
        id:   record.id,
        name: record.name,
        link: record.link,
      });
    });

    while(cardElements.firstChild) {
      cardElements.removeChild(cardElements.firstChild);
    };

    const initialElements = initialCards.map(addCard);
    initialElements.forEach(element => cardElements.append(element));
  }

  request.onreadystatechange = function() {

    if (request.readyState != 4) return;

    if (request.status != 200) {
      bigCardImage.src = "./images/error.jpg";
       //"https://xn--443-5cd3cgu2f.xn--p1ai/wp-content/uploads/error.jpg";

      changeFormVisibility(formBigCard);
    }

  }

  request.send()

}

const addCardToDB = () => {

  const request = new XMLHttpRequest();

  const body = 'name=' + encodeURIComponent(inputDescription.value) + '&link=' + encodeURIComponent(inputLink.value);

  request.open("POST", 'http://127.0.0.1:3002/cards', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 201) {
      refreshCards();
    };
  };

  request.send(body);

}

refreshCards();

document.addEventListener('click', exitForm);
document.addEventListener('keydown', exitForm);
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openNewItemForm);
formProfile.addEventListener('submit', formProfileSubmitHandler);
formNewItem.addEventListener('submit', formNewItemSubmitHandler);
