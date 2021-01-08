const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
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
const popups = document.querySelectorAll('.popup');
const fullPicture = document.querySelector('.popup__picture');
const textPicture = document.querySelector('.popup__sign');

const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__heart_anabled');
};

const deleteHandleIcon = (evt) => {
    evt.target.parentElement.parentElement.remove();}

const openPicturePopup = (name, link) => {
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

function openPopup (popup) {
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


function createCard (name, link) {
    const element = cardTemplate.cloneNode(true);
    const elementTitle = element.querySelector('.element__title');
    const elementPicture = element.querySelector('.element__picture');
    const likeButton = element.querySelector('.element__heart');
    const deleteButton = element.querySelector('.element__trash');
    elementTitle.textContent = name;
    elementPicture.src = link;
    elementPicture.alt = 'Картинка карточки' + name;
    elementPicture.addEventListener('click', () => {openPicturePopup(name, link)});
    likeButton.addEventListener('click', handleLikeIcon);
    deleteButton.addEventListener('click', deleteHandleIcon);
    return element;
}   

function addCard(container, cardElement) {
    container.prepend(cardElement);
 }

 function createInitialCards (array, container) {
    array.forEach((item) => {
        addCard(container, createCard(item.name, item.link));
    })}
    
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
  addCard(cards, createCard(nameCard.value, nameUrl.value));
  formAddPicture.reset()
  closePopup(popUpAdd)});
createInitialCards(initialCards, cards);

