import {Card} from './card.js'

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const nameProfile = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const popUpEdit = document.querySelector('#edit');
const popUpAdd = document.querySelector('#add');
const placeHolderName = nameProfile.textContent;
const placeHolderProfession = profession.textContent;
const formElementName = document.querySelector('.popup__form_info_name');
const formElementJob = document.querySelector('.popup__form_info_job');
const nameCard = document.querySelector('.popup__form_info_name-picture');
const nameUrl = document.querySelector('.popup__form_info_url');
const formEditInfo = document.querySelector('#form_redaction');
const formAddPicture = document.querySelector('#form_add');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements');
const formElement = document.querySelector('.popup__form-input');
const popups = document.querySelectorAll('.popup');

const initialCards = [
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

export function openPopup (popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeByEscape);
    }

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeByEscape);
    }

function editProfile () {
   openPopup(popUpEdit);
   formElementName.value = nameProfile.textContent;
   formElementJob.value = profession.textContent;
}


function editInfo (evt) {
    evt.preventDefault();
    nameProfile.textContent=formElementName.value;
    profession.textContent=formElementJob.value;
    closePopup(popUpEdit);
 }
    
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_active')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
          }
    })
}) 

function closeByEscape (evt) {
    if(evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active')
        closePopup(openedPopup);}}

editButton.addEventListener('click', editProfile); 
addButton.addEventListener('click', () => {openPopup(popUpAdd)});
submitButton.addEventListener('click', editInfo);
formAddPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = new Card (nameCard.value, nameUrl.value, cardTemplate);
  card.addCardClass(cards);
  formAddPicture.reset()
  closePopup(popUpAdd)});

    function createInitialCards (array, container) {
        array.forEach((item) => {
            const card = new Card (item.name, item.link, cardTemplate);
            card.addCardClass(container);
        })}

createInitialCards(initialCards, cards);