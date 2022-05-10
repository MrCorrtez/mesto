import Popup from './Popup.js';
import {inputName, inputOccupation} from './variables.js';

export default class PopupWithForm extends Popup {
    constructor(formSelector, submitHandler) {
        super(formSelector);
        this._submitHandler = submitHandler;
    }

    _getInputValues() {

        const inputList = this._form.querySelectorAll('.popup__input');

        this._formValues = {};
      
        inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close();
        this._form.reset();
    }
}