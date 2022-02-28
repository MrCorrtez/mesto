let editButton = document.querySelector('.profile__editButton');
let exitButton = document.querySelector('.popup__exitButton');
let saveButton = document.querySelector('.popup__saveButton');

let popup = document.querySelector('.popup');

let inputName = document.querySelector('.popup__name');
let inputOccupation = document.querySelector('.popup__occupation');

let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

function editProfile() {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
}

function exitProfile() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  exitProfile();
}

editButton.addEventListener('click', editProfile);
exitButton.addEventListener('click', exitProfile);
popup.addEventListener('submit', formSubmitHandler);
