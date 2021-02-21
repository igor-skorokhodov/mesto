import './index.css';

import {Card} from '../components/card.js'
import {Section} from '../components/section.js'
import {Validator} from '../components/validator.js'
import {PopupWithForm} from '../components/popupwithform.js'
import {PopupWithImage} from '../components/popupwithimage.js'
import {UserInfo} from '../components/userinfo.js'
import {editButton, addButton, cardTemplate, 
    settings, formList, initialCards} from '../components/constants.js'

formList.forEach((formElement) => { //вешаем валидацию на формы
    const form = new Validator (settings, formElement);
    form.enableValidation();
});

const editProfile = new UserInfo ('.profile__name', '.profile__profession');  //создаем экземпляр инфы о пользователе

export const popupEdit = new PopupWithForm ('#edit', (input) => { //создаем попап формы редактирования данных о пользователе
    editProfile.setUserInfo(input.name, input.job);
 });
 popupEdit.setEventListeners(); //вешаем на эту форму слушатели
 
 const popupEditObject = editProfile.getUserInfo(); //создаем объект с данными пользвателя

export const popupAdd = new PopupWithForm ('#add', (object) => { //создали попап добавления карточки
    const array = [];
    array.push(object);
    const formPopupCard = new Section({
        items: array,
        renderer: (item) => {
            const card = addCard(item.placename, item.placeurl);
            formPopupCard.addItem(card);
}}, '.elements');
       formPopupCard.renderItems();
 }); 
 popupAdd.setEventListeners(); //вешаем слушатели на форму добавления новой карточки
 
  
 const popupWithImage = new PopupWithImage ('#picture'); //создаем попап картинки во весь экран
 popupWithImage.setEventListeners(); //вешаем на эту форму слушатели

editButton.addEventListener('click', ()=> { //слушаем кнопку открытия окна редактирования профиля
    popupEdit.open();
    });
 
addButton.addEventListener('click', () => { //открытие попапа для добавления карточки
    popupAdd.open();
});
 
const cardsList = new Section({ //генерация карточек из массива через слой Section
    items: initialCards,
    renderer: (item) => {  
    const card = addCard(item.name, item.link);
        cardsList.addItem(card);
    }}, '.elements');        
cardsList.renderItems(); //прориосовали

function handleCardClick(name, link) { //функция открытия карточки в полный размер
    const fullPicture = document.querySelector('.popup__picture')
    fullPicture.src = link
    fullPicture.textContent = name
    popupWithImage.open(name, link);
}

function setUserInformation (input) { //функция добавления информации о пользователе в инпутах
    const formName = document.querySelector('.popup__form_info_name');
    const formJob = document.querySelector('.popup__form_info_job');
    formName.value = input.name;
    formJob.value = input.job;
}

function addCard (name, link) { //функция добавления карточки
    const card = new Card (name, link, cardTemplate, () =>  {handleCardClick(name, link)});
    return card.createCard();
}
     
setUserInformation(popupEditObject); //исполнили функцию