import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(formSelector) {
        super(formSelector);
        this._bigCardImage = document.querySelector('.popup__image');
        this._bigCardCaption = document.querySelector('.popup__caption');
    }

    open(src, alt) {
        this._bigCardImage.src           = src;
        this._bigCardCaption.textContent = alt;
        super.open();        
    }
}