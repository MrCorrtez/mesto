import Card from './card.js';
import {inputDescription, inputLink, cardElements} from './variables.js';

export default function refreshCards() {

  while(cardElements.firstChild) {
    cardElements.removeChild(cardElements.firstChild);
  };

  const request = new XMLHttpRequest();

  request.open('GET', 'http://127.0.0.1:3002/cards', true);

  request.onload = function () {    

    const data = JSON.parse(this.response);

    data.forEach(record => {

      const newCard = new Card(record, '#card-template');
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

  request.send();

}

export const addCardToDB = () => {

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