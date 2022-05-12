import Card from './Card.js';
import Section from './Section.js';
import {imagePopup} from '../pages/index.js';
import {inputDescription, inputLink, cardElements} from '../utils/variables.js';

let CardsSection = undefined; 

export default function refreshCards() {

  while(cardElements.firstChild) {
    cardElements.removeChild(cardElements.firstChild);
  };

  const request = new XMLHttpRequest();

  request.open('GET', 'http://127.0.0.1:3002/cards', true);

  request.onload = function () {    
    
    const data = {items: JSON.parse(this.response),
                  renderer: record => {
                    const newCard = new Card(record, '#card-template', evt => imagePopup.open(evt.target.src, evt.target.alt));
                    const cardElement = newCard.getCard();
                    CardsSection.addItem(cardElement);            
                  }};

    CardsSection = new Section(data, '.elements');
    CardsSection.renderAll();
    
  }

  request.onreadystatechange = function() {

    if (request.readyState != 4) return;

    if (request.status != 200) {
      bigCardImage.src = "./images/error.jpg";
      changeFormVisibility(formBigCard);
    }

  }

  request.send();

}

export const addCardToDB = () => {

  const request = new XMLHttpRequest();

  const name = inputDescription.value;
  const link = inputLink.value;

  request.open("POST", 'http://127.0.0.1:3002/cards', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  request.onreadystatechange = function () {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 201) {

      const record = {id: Number(request.response), 
                      name: name,
                      link: link};

      const newCard = new Card(record, '#card-template', evt => imagePopup.open(evt.target.src, evt.target.alt));
      const cardElement = newCard.getCard();
      CardsSection.addItem(cardElement);

    };
  };

  request.send('name=' + encodeURIComponent(name) + '&link=' + encodeURIComponent(link));

}