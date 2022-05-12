export const inputDescription = document.querySelector('.type_new-item .popup__input_type_line-one');
export const inputLink        = document.querySelector('.type_new-item .popup__input_type_line-two');
export const cardElements     = document.querySelector('.elements');

export const inputName        = document.querySelector('.type_profile .popup__input_type_line-one');
export const inputOccupation  = document.querySelector('.type_profile .popup__input_type_line-two');

export const editButton  = document.querySelector('.profile__editButton');
export const addButton   = document.querySelector('.profile__addButton');

export const validatingParametres = {
  formSelector:         '.popup__container',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  inactiveButtonClass:  'popup__saveButton_error',
  inputErrorClass:      'popup__input_style-error',
  errorClass:           'popup__input-error_place_line'
};

export const initUserData = {
  name:       'Жак-Ив Кусто',
  occupation: 'Исследователь океана'
};