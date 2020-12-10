let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
let submitButton = document.querySelector('.popup__submit-button');
let nameProfile = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
let popUpEdit = document.querySelector('#edit');
let popUpAdd = document.querySelector('#add');
let popUpPicture = document.querySelector('#picture');
let placeHolderName = nameProfile.textContent;
let placeHolderProfession = profession.textContent;
let formElementName = document.querySelector('.popup__form_info_name');
let formElementJob = document.querySelector('.popup__form_info_job');
let nameCard = document.querySelector('.popup__form_info_name-picture');
let nameUrl = document.querySelector('.popup__form_info_url');
let form = document.querySelectorAll('.popup__form-input');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements');
let name;
let link;

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

function EditProfile() {
   openPopup(popUpEdit);
   formElementName.value=nameProfile.textContent;
   formElementJob.value=profession.textContent;
}

function addPopup() {
    openPopup(popUpAdd);
}

function addPicture (evt) {
    evt.preventDefault();
    let newCard = cardTemplate.cloneNode(true);
    name = nameCard.value;
    link = nameUrl.value;
    let object = {name, link};
    initialCards.unshift(object);
    console.log(initialCards);
    newCard.querySelector('.element__title').textContent = name;
    newCard.querySelector('.element__picture').src = link;
    cards.prepend(newCard);
    closePopup(popUpAdd);
    like();
    deleteItem();
    picturePopup();
 }

 for (i=0; i<initialCards.length; i++){
    let newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.element__title').textContent = initialCards[i].name;
    newCard.querySelector('.element__picture').src = initialCards[i].link;
    cards.prepend(newCard);
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
        eventTarget.style.background ="url(images/heart_anabled.svg) no-repeat scroll 0 0 transparent";})})}



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


 [].forEach.call(closeButton, function(item) {
    item.addEventListener('click', function() {
     closePopup(popUpAdd);
     closePopup(popUpEdit);
     closePopup(popUpPicture);
    });
  });

 editButton.addEventListener('click', EditProfile); 
 addButton.addEventListener('click', addPopup); 
 form[0].addEventListener('submit', editInfo);
 form[1].addEventListener('submit', addPicture);
 like();
 deleteItem();
 picturePopup();
