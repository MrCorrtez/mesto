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

const cardElements = document.querySelector('.elements');

class Card {

  constructor(dbRecord, cardSelector) {
    this.id = dbRecord.id;
    this.link = dbRecord.link;
    this.name = dbRecord.name;
    this.cardSelector = cardSelector;
  }

  _getTemplate() {

    const cardElement  = document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    return cardElement;

  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', this._toggleLike);
    this._element.querySelector('.elements__deleteButton').addEventListener('click', this._removeCard);
    this._element.querySelector('.elements__image').addEventListener('click', this._openImageForm);

  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__like_active');    
  }

  _removeCard(evt)  {

    const element = evt.target.closest('.elements__element')
  
    const request = new XMLHttpRequest();
  
    request.open("DELETE",  'http://127.0.0.1:3002/cards/' + element.id, true);
  
    request.onload = function () {
      if(request.readyState === XMLHttpRequest.DONE) {
        element.remove();        
      };
    };
  
    request.send(null);
  
  }

  _openImageForm(evt) {

    bigCardImage.src           = evt.target.src;
    bigCardCaption.textContent = evt.target.alt;
  
    changeFormVisibility(formBigCard);
    document.addEventListener('keydown', exitForm);
  
  }

  addCard() {
    
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.id = this.id;
  
    this._element.querySelector('.elements__name').textContent = this.name;
    this._element.querySelector('.elements__image').src        = this.link;
    this._element.querySelector('.elements__image').alt        = this.name;
   
    return this._element;
  
  }

}

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
  document.addEventListener('keydown', exitForm);

}

const openNewItemForm = () => {

  changeFormVisibility(formNewItem);
  document.addEventListener('keydown', exitForm);

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
    document.removeEventListener('keydown', exitForm);
  }
}

const handleformProfileSubmit = evt => {

  evt.preventDefault();

  profileName.textContent       = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  exitForm(evt);

}

const handleformNewItemSubmit = evt => {

  evt.preventDefault();

  addCardToDB();
  exitForm(evt);

}

const refreshCards = () => {

  const request = new XMLHttpRequest();

  request.open('GET', 'http://127.0.0.1:3002/cards', true);

  while(cardElements.firstChild) {
    cardElements.removeChild(cardElements.firstChild);
  };

  request.onload = function () {    

    const data = JSON.parse(this.response);

    data.forEach(record => {

      newCard = new Card(record, '#card-template');
      cardElements.append(newCard.addCard());

    });   
    
  }

  request.onreadystatechange = function() {

    if (request.readyState != 4) return;

    if (request.status != 200) {
      bigCardImage.src = "./images/error.jpg";
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
editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openNewItemForm);
formProfile.addEventListener('submit', handleformProfileSubmit);
formNewItem.addEventListener('submit', handleformNewItemSubmit);
