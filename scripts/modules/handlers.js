import {addCardToDB as addCardToDB} from './data.js';
import {inputName, inputOccupation, profileName, profileOccupation, formProfile, formNewItem, editButton, addButton, popup} from './variables.js';

export default function addEventListeners() {

    document.addEventListener('click', exitForm);
    editButton.addEventListener('click', openProfileForm);
    addButton.addEventListener('click', openNewItemForm);
    formProfile.addEventListener('submit', handleformProfileSubmit);
    formNewItem.addEventListener('submit', handleformNewItemSubmit);

}

export const changeFormVisibility = form => {

    popup.classList.toggle('hidden');
    popup.classList.toggle('visible');
    form.classList.toggle('hidden');
    form.classList.toggle('visible');
  
  }

export const exitForm = evt => {

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