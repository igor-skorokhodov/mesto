const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
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


function editInfo (evt) {
    evt.preventDefault();
    nameProfile.textContent=formElementName.value;
    profession.textContent=formElementJob.value;
    closePopup(popUpEdit);
 }


function createCard(name, link) {
    const element = cardTemplate.cloneNode(true);
    namingNewCard(element, name, link);
    return element;
}

function namingNewCard (card, name, link) {
    const elementTitle = card.querySelector('.element__title');
    const elementPicture = card.querySelector('.element__picture'); 
    elementTitle.textContent = name;
    elementPicture.src = link;
    elementPicture.alt = 'Картинка карточки';
    likeCard(card);
    deleteCard(card);
    picturePopup(card);
}

function addCard(container, cardElement) {
    container.prepend(cardElement);
 }

 function containerAddPicture (container, massive) {
    container.forEach(function(item) {
        addCard(massive, createCard(item.name, item.link));
    })}
    
function likeCard(card) {
    let likeElement = card.querySelector('.element__heart'); 
        likeElement.addEventListener('click', function (evt) {
        let eventTarget = evt.target;
        eventTarget.classList.toggle('element__heart_anabled');})}



function deleteCard(card) {
    let deleteCard = card.querySelector('.element__trash');
    let parent1 = deleteCard.parentElement;
    let parent2 = parent1.parentElement;
    deleteCard.addEventListener('click', function () {
        parent2.remove();})
}

function picturePopup(card) {
    let picturePopup = card.querySelector('.element__picture');
    let fullPicture = document.querySelector('.popup__picture');
    let textPicture = document.querySelector('.popup__sign');
    let sign = picturePopup.parentElement.nextElementSibling.firstElementChild;
    picturePopup.addEventListener('click', function () {
    fullPicture.src = picturePopup.src;
    textPicture.textContent = sign.textContent;
    openPopup(popUpPicture);
    })};


 editButton.addEventListener('click', editProfile); 
 addButton.addEventListener('click', (item) => {openPopup(popUpAdd)}); 
 formEditInfo.addEventListener('submit', editInfo);
 formAddPicture.addEventListener('submit', (evt) => {
     evt.preventDefault();
     addCard(cards, createCard(nameCard.value, nameUrl.value)); 
     closePopup(popUpAdd)});
 closeButtonEdit.addEventListener('click', (item) => {closePopup(popUpEdit)});
 closeButtonAdd.addEventListener('click', (item) => {closePopup(popUpAdd)});
 closeButtonPicture.addEventListener('click', (item) => {closePopup(popUpPicture)});
 containerAddPicture(initialCards, cards);