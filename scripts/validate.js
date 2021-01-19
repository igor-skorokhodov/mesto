import {Validator} from './validator.js'

const settings = {
    formSelector: '.popup__form-input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'form__inactive',
    inputErrorClass: 'popup__form-error',
    errorClass: 'popup__form_error-active'
}

const formList = document.querySelectorAll(settings.formSelector);

formList.forEach((formElement) => {
const form = new Validator (settings, formElement);
form.enableValidation();
});
