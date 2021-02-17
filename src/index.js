import './pages/index.css';

import {Card} from './pages/card.js'
import {Section} from './pages/section.js'
import {Validator} from './pages/validator.js'
import {Popup} from './pages/popup.js'
import {PopupWithForm} from './pages/popupwithform.js'
import {PopupWithImage} from './pages/popupwithimage.js'
import {UserInfo} from './pages/userinfo.js'
import {editButton, addButton, submitButton, subButton, 
    cardTemplate, settings, formList, initialCards} from './components/constants.js'


formList.forEach((formElement) => {
const form = new Validator (settings, formElement);
form.enableValidation();
});
    
 const popupEdit = new Popup ('#edit'); //создали попап эдита
 const popupAdd = new PopupWithForm ('#add', () => {}); //создали попап добавления карточки
 const editProfile = new UserInfo ('.profile__name', '.profile__profession'); //собрали инфу о пользователе
 

editButton.addEventListener('click', ()=> { //слушаем кнопку открытия окна редактирования профиля
    editProfile.getUserInfo();
    popupEdit.open();
    popupEdit.setEventListeners();
    });
 
addButton.addEventListener('click', () => { //открытие попапа для добавления карточки
    popupAdd.open();
    popupAdd.setEventListeners();
});

submitButton.addEventListener('click', () => { //изменение информации профиля
    editProfile.setUserInfo();
    popupEdit.close();
});
 

const cardsList = new Section({ //генерация карточек из массива через слой Section
    items: initialCards,
    renderer: (item) => {  
    const card = new Card(item.name, item.link, cardTemplate, 
    () => {
        const popupWithImage = new PopupWithImage ('#picture', card._name, card._link);
        popupWithImage.open();
        popupWithImage.setEventListeners();});
        const cardElement = card.createCard();
        cardsList.addItem(cardElement);
    }}, '.elements');        
cardsList.renderItems(); //прориосовали


const formPopupCard = new PopupWithForm ( //создаем карточку через форму
    '.popup__form',
    (input) => {
        const card = new Card(input.placename, input.placeurl, cardTemplate, () =>{
            const popupWithImage = new PopupWithImage ('#picture', card._name, card._link);
            popupWithImage.open();
        popupWithImage.setEventListeners();})
                 
        const cardElement = card.createCard();
       cardsList.addItem(cardElement);
                  });

    subButton.addEventListener('click', () => { //слушаем кнопку создания карточки
    formPopupCard.setEventListeners();
    popupAdd.close();
})

     
