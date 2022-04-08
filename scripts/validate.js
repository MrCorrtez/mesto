const enableDocumentValidating = ({formSelector,...parametres}) => {

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => enableFormValidating(formElement, parametres));

}

const enableFormValidating = (formElement,{inputSelector,...parametres}) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach(input => {

    input.addEventListener('input', function() {

      if (!input.validity.valid) {
        showError(input,parametres);
      }
      else {
        hideError(input,parametres);
      }

      checkSubmitterAvailability(inputList,parametres);

    });

  });
}

const checkSubmitterAvailability = (inputList,{submitButtonSelector,inactiveButtonClass,...parametres}) => {

  const submitButton = inputList[0].form.querySelector(submitButtonSelector);

  if (inputList.every(input => input.validity.valid)) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
  else {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

}

const showError = (input,{inputErrorClass,errorClass,...parametres}) => {

  input.classList.add(inputErrorClass);

  const spanError = input.form.querySelector('.' + errorClass + input.id);

  spanError.classList.remove('hidden');
  spanError.textContent = input.validationMessage;

}

const hideError = (input,{inputErrorClass,errorClass,...parametres}) => {

  input.classList.remove(inputErrorClass);

  const spanError = input.form.querySelector('.' + errorClass + input.id);

  spanError.classList.add('hidden');

}

enableDocumentValidating({
  formSelector:         '.popup__container',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  inactiveButtonClass:  'popup__saveButton_error',
  inputErrorClass:      'popup__input_style-error',
  errorClass:           'popup__input-error_place_line'
});
