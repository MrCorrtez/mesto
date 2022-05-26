export default class Card {

    constructor(dbRecord, cardSelector, handleCardClick, handleDeleteButtonClick) {
      this._id = dbRecord.id;
      this._link = dbRecord.link;
      this._name = dbRecord.name;
      this._cardSelector = cardSelector;      
      this._handleCardClick = handleCardClick;
      this._handleDeleteButtonClick = handleDeleteButtonClick
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
      this._element.querySelector('.elements__deleteButton').addEventListener('click', this._handleDeleteButtonClick);
      this._element.querySelector('.elements__image').addEventListener('click', this._handleCardClick);
  
    }
  
    _toggleLike(evt) {
      evt.target.classList.toggle('elements__like_active');    
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