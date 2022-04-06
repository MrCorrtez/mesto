const enableDocumentValidating = () => {

  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach(enableFormValidating);

}

const enableFormValidating = formElement => {

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach(input => {
    input.addEventListener('input', setInputValidity);
    checkInputValidity(input);
  });

}

const setInputValidity = evt => {

  checkInputValidity(evt.target);

}

const checkInputValidity = input => {

  if (!input.validity.valid) {
    showError(input);
  }
  else {
    hideError(input);
  }

  checkSubmitterAvailability(input.form);

}

const checkSubmitterAvailability = formElement => {

  const submitButton = formElement.querySelector('.popup__saveButton');

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  if (inputList.every(input => input.validity.valid)) {
    submitButton.classList.remove('popup__saveButton_error');
    submitButton.disabled = false;
  }
  else {
    submitButton.classList.add('popup__saveButton_error');
    submitButton.disabled = true;
  }

}

const showError = input => {

  input.classList.add('popup__input_style-error');

  const spanError = input.form.querySelector('.popup__input-error_place_line' + input.id);

  spanError.classList.remove('hidden');
  spanError.textContent = input.validationMessage;

}

const hideError = input => {

  input.classList.remove('popup__input_style-error');

  const spanError = input.form.querySelector('.popup__input-error_place_line' + input.id);

  spanError.classList.add('hidden');

}

enableDocumentValidating();
