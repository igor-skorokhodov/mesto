import './index.css';

import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {Validator} from '../components/FormValidator.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {editButton, addButton, cardTemplate, 
    settings, formList, initialCards} from '../components/constants.js'

const formName = document.querySelector('.popup__form_info_name');
const formJob = document.querySelector('.popup__form_info_job');

formList.forEach((formElement) => { //вешаем валидацию на формы
    const form = new Validator (settings, formElement);
    form.enableValidation();
});

const editProfile = new UserInfo ('.profile__name', '.profile__profession');  //создаем экземпляр инфы о пользователе

export const popupEdit = new PopupWithForm ('#edit', (input) => { //создаем попап формы редактирования данных о пользователе
    editProfile.setUserInfo(input.name, input.job);
 });
 popupEdit.setEventListeners(); //вешаем на эту форму слушатели
 

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
    const popupEditObject = editProfile.getUserInfo(); 
    formName.value = popupEditObject.name;
    formJob.value = popupEditObject.job;
    setUserInformation(popupEditObject); //исполнили функцию
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
    formName.value = input.name;
    formJob.value = input.job;
}

function addCard (name, link) { //функция добавления карточки
    const card = new Card (name, link, cardTemplate, () =>  {handleCardClick(name, link)});
    return card.createCard();
}
     