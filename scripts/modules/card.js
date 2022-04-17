import {formBigCard, bigCardImage, bigCardCaption} from './variables.js';
import {changeFormVisibility, exitForm} from './handlers.js';

export default class Card {

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