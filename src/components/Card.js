export default class Card {

    constructor(dbRecord, cardSelector, handleCardClick) {
      this._id = dbRecord.id;
      this._link = dbRecord.link;
      this._name = dbRecord.name;
      this._cardSelector = cardSelector;      
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
  
      const cardElement  = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);
  
      return cardElement;
  
    }
  
    _setEventListeners() {
  
      this._element.querySelector('.elements__like').addEventListener('click', this._toggleLike);
      this._element.querySelector('.elements__deleteButton').addEventListener('click', this._removeCard);
      this._element.querySelector('.elements__image').addEventListener('click', this._handleCardClick);
  
    }
  
    _toggleLike(evt) {
      evt.target.classList.toggle('elements__like_active');    
    }
  
    _removeCard(evt)  {
  
      const element = evt.target.closest('.elements__element')
    
      const request = new XMLHttpRequest();
    
      request.open("DELETE",  'http://127.0.0.1:3002/cards/' + element._id, true);
    
      request.onload = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
          element.remove();        
        };
      };
    
      request.send(null);
    
    }
  
    getCard() {
      
      this._element = this._getTemplate();
  
      this._setEventListeners();
  
      this._element.id = this._id;
    
      this._element.querySelector('.elements__name').textContent = this._name;
      this._element.querySelector('.elements__image').src        = this._link;
      this._element.querySelector('.elements__image').alt        = this._name;
     
      return this._element;
    
    }
  
  }