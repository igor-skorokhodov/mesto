const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const closeButtonEdit = document.querySelector("#close_button_edit");
const closeButtonAdd = document.querySelector("#close_button_add");
const closeButtonPicture = document.querySelector("#close_button_picture");
const nameProfile = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const popUpEdit = document.querySelector('#edit');
const popUpAdd = document.querySelector('#add');
const popUpPicture = document.querySelector('#picture');
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
const allPopup = document.querySelectorAll('.popup');

const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__heart_anabled');
};

const deleteHandleIcon = (evt) => {
    evt.target.parentElement.parentElement.remove();}

const popupWindow = (name, link) => {
    const fullPicture = document.querySelector('.popup__picture');
    const textPicture = document.querySelector('.popup__sign');
    fullPicture.src = link;
    fullPicture.alt = "Место крупным планом";
    textPicture.textContent = name;
    openPopup(popUpPicture);
}

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

function openPopup (item) {
    item.classList.add('popup_active');
    }

function closePopup(item) {
    item.classList.remove('popup_active');
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


function createCard (name, link) {
    const element = cardTemplate.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementPicture = element.querySelector('.element__picture');
    const likeButton = element.querySelector('.element__heart');
    const deleteButton = element.querySelector('.element__trash');
    elementTitle.textContent = name;
    elementPicture.src = link;
    elementPicture.alt = 'Картинка карточки';
    elementPicture.addEventListener('click', () => {popupWindow(name, link)});
    likeButton.addEventListener('click', handleLikeIcon);
    deleteButton.addEventListener('click', deleteHandleIcon);
    return element;
}   

function addCard(container, cardElement) {
    container.prepend(cardElement);
 }

 function containerAddPicture (container, massive) {
    container.forEach((item) => {
        addCard(massive, createCard(item.name, item.link));
    })}
    
formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

function closingPopup (item, popup) {
  if (item.target.classList.contains('popup')) {
    closePopup(popup);}
}

function closingPopupEsc (evt) {
  allPopup.forEach ((popup) => {
    if(evt.keyCode === 27) {
      popup.classList.remove('popup_active');}})
    }

editButton.addEventListener('click', editProfile); 
addButton.addEventListener('click', () => {openPopup(popUpAdd)});
submitButton.addEventListener('click', editInfo);
formAddPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(cards, createCard(nameCard.value, nameUrl.value)); 
  closePopup(popUpAdd)});
popUpEdit.addEventListener('click', (evt) => {
  closingPopup(evt, popUpEdit);
});
document.addEventListener('keydown', (evt) => {
  closingPopupEsc(evt);
});
popUpAdd.addEventListener('click', (evt) => {
  closingPopup(evt, popUpAdd);
});
popUpPicture.addEventListener('click', (evt) => {
  closingPopup(evt, popUpPicture);
});
  
closeButtonEdit.addEventListener('click', () => {closePopup(popUpEdit)});
closeButtonAdd.addEventListener('click', () => {closePopup(popUpAdd)});
closeButtonPicture.addEventListener('click', () => {closePopup(popUpPicture)});
containerAddPicture(initialCards, cards);

