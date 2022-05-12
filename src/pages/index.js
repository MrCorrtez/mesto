import './index.css';

import refreshCards from '../components/data.js';

import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

import FormValidator from '../components/FormValidator.js';

import {inputName, inputOccupation, editButton, addButton, validatingParametres, initUserData} from '../utils/variables.js';

import {addCardToDB as addCardToDB} from '../components/data.js';

//popup с большой картинкой
export const imagePopup = new PopupWithImage('.popup__big-card');
imagePopup.setEventListeners();

//popup редактирования профайла
export const profilePopup = new PopupWithForm('.type_profile', evt => {
    
    evt.preventDefault();
  
    profilePopup._getInputValues();

    currentUserInfo.setUserInfo(profilePopup._formValues);

    profilePopup.close();
});

profilePopup.setEventListeners();

editButton.addEventListener('click', () => {
    const userData = currentUserInfo.getUserInfo();
    inputName.value       = userData.name;
    inputOccupation.value = userData.occupation;
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

//инициализация пользователя
export const currentUserInfo = new UserInfo({userNameSelector: '.profile__name', occupationSelector:'.profile__occupation'});
currentUserInfo.setUserInfo(initUserData);

//подключение валидации формы
const {formSelector,...parametres} = validatingParametres;
const formList = Array.from(document.querySelectorAll(formSelector));

formList.forEach(formElement => {
    const validator = new FormValidator(parametres, formElement);
    validator.enableValidation();    
});  

//рендеринг карточек
refreshCards();