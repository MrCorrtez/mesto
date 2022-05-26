import './index.css';

import Card from '../components/card.js';
import Section from '../components/section.js';

import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';

import UserInfo from '../components/userInfo.js';

import FormValidator from '../components/formValidator.js';

import Api from '../utils/api.js';

import {inputName, inputOccupation, editButton, addButton, validatingParametres, initUserData, inputDescription, inputLink, cardElements} from '../utils/constants.js';

let CardsSection = undefined;

//инициализация API
const cardsApi = new Api('http://127.0.0.1:3002/cards');

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
  
    const name = inputDescription.value;
    const link = inputLink.value;

    cardsApi.addCard('name=' + encodeURIComponent(name) + '&link=' + encodeURIComponent(link))
        .then(id => {
            const record = {id: Number(id), 
                name: name,
                link: link};

            const newCard = new Card(record,
                                     '#card-template',
                                     evt => imagePopup.open(evt.target.src, evt.target.alt),
                                     evt => {
                                        const element = evt.target.closest('.elements__element');
                                        cardsApi.deleteCard(element.id)
                                            .then(res => element.remove())
                                            .catch(err => console.log(err.message))
                                       });
            const cardElement = newCard.getCard();
            CardsSection.addItem(cardElement);

            newItemPopup.close();
        })
        .catch(err => {
            console.log(err.message);
        })
    
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
const renderCards = () => {

    while(cardElements.firstChild) {
      cardElements.removeChild(cardElements.firstChild);
    };
  
    cardsApi.getCards()
        .then(items => {
            const data = {items: items,
                          renderer: record => {
                          const newCard = new Card(record,
                                                   '#card-template',
                                                   evt => imagePopup.open(evt.target.src, evt.target.alt),
                                                   evt => {
                                                    const element = evt.target.closest('.elements__element');
                                                    cardsApi.deleteCard(element.id)
                                                        .then(res => element.remove())
                                                        .catch(err => console.log(err.message))
                                                   });
                          const cardElement = newCard.getCard();
                          CardsSection.addItem(cardElement);            
                        }};

            CardsSection = new Section(data, '.elements');
            CardsSection.renderAll();
        })
        .catch(err => {
            imagePopup.open('https://xn--443-5cd3cgu2f.xn--p1ai/wp-content/uploads/error.jpg',err.message);
        }) 
}
renderCards();