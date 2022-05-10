import enableDocumentValidating from './modules/validate.js';
import refreshCards from './modules/data.js';

import PopupWithImage from './modules/PopupWithImage.js';
import PopupWithForm from './modules/PopupWithForm.js';

import {profileName, profileOccupation, inputName, inputOccupation, editButton, addButton} from './modules/variables.js';

import {addCardToDB as addCardToDB} from './modules/data.js';

//popup с большой картинкой
export const imagePopup = new PopupWithImage('.popup__big-card');
imagePopup.setEventListeners();

//popup редактирования профайла
export const profilePopup = new PopupWithForm('.type_profile', evt => {
    evt.preventDefault();
  
    profilePopup._getInputValues();

    profileName.textContent       = profilePopup._formValues.Name;
    profileOccupation.textContent = profilePopup._formValues.Occupation;
  
    profilePopup.close();
});

profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
    inputName.value       = profileName.textContent;
    inputOccupation.value = profileOccupation.textContent;
    profilePopup.open();
});

//popup редактирования новой карточки
export const newItemPopup = new PopupWithForm('.type_new-item', evt => {
    evt.preventDefault();
  
    addCardToDB();
  
    newItemPopup.close();
});

newItemPopup.setEventListeners();

addButton.addEventListener('click', () => {
    newItemPopup.open();
});

//первоначальная отрисовка, подключение валидации
refreshCards();
enableDocumentValidating();