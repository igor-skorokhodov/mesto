export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const submitButton = document.querySelector('.popup__submit-button');
export const cardTemplate = document.querySelector('#card').content;
export const subButton = document.querySelector('.popup__add-button');

export const settings = {
    formSelector: '.popup__form-input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'form__inactive',
    inputErrorClass: 'popup__form-error',
    errorClass: 'popup__form_error-active'
}

export const formList = document.querySelectorAll(settings.formSelector);

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
 ];