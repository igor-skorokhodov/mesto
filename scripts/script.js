const editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const closeButtonEdit = document.querySelector("#close_button_edit");
const closeButtonAdd = document.querySelector("#close_button_add");
const closeButtonPicture = document.querySelector("#close_button_picture");
let nameProfile = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
const popUpEdit = document.querySelector('#edit');
const popUpAdd = document.querySelector('#add');
const popUpPicture = document.querySelector('#picture');
let placeHolderName = nameProfile.textContent;
let placeHolderProfession = profession.textContent;
let formElementName = document.querySelector('.popup__form_info_name');
let formElementJob = document.querySelector('.popup__form_info_job');
let nameCard = document.querySelector('.popup__form_info_name-picture');
let nameUrl = document.querySelector('.popup__form_info_url');
const formEditInfo = document.querySelector('#form_redaction');
const formAddPicture = document.querySelector('#form_add');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements');
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

function editProfile() {
   openPopup(popUpEdit);
   formElementName.value = nameProfile.textContent;
   formElementJob.value = profession.textContent;
}

function cardPrepend (item) {
    cards.prepend(item);
}

function namingNewCard (item) {
    let newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.element__title').textContent = item.name;
    newCard.querySelector('.element__picture').src = item.link;
    newCard.querySelector('.element__picture').alt = 'Картинка карточки';
    cardPrepend(newCard);
}

function getCardElement (arr) {
    arr.forEach(function (item) {
        namingNewCard(item);
    })
    like();
    deleteItem();
    picturePopup();
}

function addPicture (evt) {
    evt.preventDefault();
    let cardObject = {name: nameCard.value, link: nameUrl.value}; 
    let newCard = cardTemplate.cloneNode(true);
    namingNewCard(cardObject); 
    closePopup(popUpAdd);
    like();
    deleteItem();
    picturePopup();
    
 }

 function editInfo (evt) {
   evt.preventDefault();
   nameProfile.textContent=formElementName.value;
   profession.textContent=formElementJob.value;
   closePopup(popUpEdit);
}

function like() {
    let likeArr = document.querySelectorAll('.element__heart');
    likeArr.forEach(function(item) { 
        item.addEventListener('click', function (evt) {
        let eventTarget = evt.target;
        eventTarget.classList.toggle('element__heart_anabled');})})}



function deleteItem() {
    let parentArr = document.querySelectorAll('.element__trash');
    parentArr.forEach (function (item) {
    let parent1 = item.parentElement;
    let parent2 = parent1.parentElement;
    item.addEventListener('click', function () {
        parent2.remove();})})
}

function picturePopup() {
    let picturePopupArr = document.querySelectorAll('.element__picture');
    let fullPicture = document.querySelector('.popup__picture');
    let textPicture = document.querySelector('.popup__sign');
    picturePopupArr.forEach (function (item) {
        let sign=item.parentElement.nextElementSibling.firstElementChild;
        item.addEventListener('click', function (evt) {
        fullPicture.src = item.src;
        textPicture.textContent=sign.textContent;
        openPopup(popUpPicture);
    })})};


 editButton.addEventListener('click', editProfile); 
 addButton.addEventListener('click', function () {openPopup(popUpAdd)}); 
 formEditInfo.addEventListener('submit', editInfo);
 formAddPicture.addEventListener('submit', addPicture);
 closeButtonEdit.addEventListener('click', function() {closePopup(popUpEdit)});
 closeButtonAdd.addEventListener('click', function() {closePopup(popUpAdd)});
 closeButtonPicture.addEventListener('click', function() {closePopup(popUpPicture)});
 getCardElement(initialCards);
