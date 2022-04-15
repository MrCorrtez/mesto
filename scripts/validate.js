class FormValidator {

  constructor(parametres, formElement) {

    this._inputList            = Array.from(formElement.querySelectorAll(parametres.inputSelector));
    this._submitButtonSelector = parametres.submitButtonSelector;
    this._inactiveButtonClass  = parametres.inactiveButtonClass;
    this._inputErrorClass      = parametres.inputErrorClass;
    this._errorClass           = parametres.errorClass;       

  }


  enableValidation () {

    this._inputList.forEach(input => {
  
      input.addEventListener('input', (evt) => {
        this._handleValidity(evt);
      });
  
    });  

  }

  _handleValidity(evt) {

    const input = evt.target;

    if (!input.validity.valid) {
      this._showError(input);
    }
    else {
      this._hideError(input);
    }

    this._checkSubmitterAvailability();    

  }

  _checkSubmitterAvailability() {

    const submitButton = this._inputList[0].form.querySelector(this._submitButtonSelector);
  
    if (this._inputList.every(input => input.validity.valid)) {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
    else {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    }
  
  }
  
  _showError(input) {
  
    input.classList.add(this._inputErrorClass);
  
    const spanError = input.form.querySelector('.' + this._errorClass + input.id);
  
    spanError.classList.remove('hidden');
    spanError.textContent = input.validationMessage;
  
  }
  
  _hideError(input) {
  
    input.classList.remove(this._inputErrorClass);
  
    const spanError = input.form.querySelector('.' + this._errorClass + input.id);
  
    spanError.classList.add('hidden');
  
  }

}

const enableDocumentValidating = ({formSelector,...parametres}) => {

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {

    validator = new FormValidator(parametres, formElement);
    validator.enableValidation();
    
  });  

}

enableDocumentValidating({
  formSelector:         '.popup__container',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  inactiveButtonClass:  'popup__saveButton_error',
  inputErrorClass:      'popup__input_style-error',
  errorClass:           'popup__input-error_place_line'
});
