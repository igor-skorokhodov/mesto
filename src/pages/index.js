import './index.css';
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {Validator} from '../components/FormValidator.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'
import {Popup} from '../components/Popup.js'
import {editButton, addButton, cardTemplate, 
    settings, formList} from '../components/constants.js'
const avatar = document.querySelector('.profile__avatar_container');
const formName = document.querySelector('.popup__form_info_name');
const formJob = document.querySelector('.popup__form_info_job');
const avatarPic = document.querySelector('.profile__avatar');
const pen = document.querySelector('.profile__avatar_pen');
pen.onmouseover = function(){avatarPic.style.opacity = 0.2};
pen.onmouseout = function(){avatarPic.style.opacity = 1};


formList.forEach((formElement) => { //вешаем валидацию на формы
    const form = new Validator (settings, formElement);
    form.enableValidation();
});

const api = new Api ({ //создаем экземпляр класса API
    url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
    headers: {
        'authorization': '9c0a4b23-790f-477e-8923-142dbfd6589d',
        'Content-Type': 'application/json'
      }
});

const deleteQuestion = new Popup ('#delete');
deleteQuestion.setEventListeners();

const editProfile = new UserInfo ('.profile__name', '.profile__profession'); //создаем экземпляр инфы о пользователе

api.setUserInfo() //получаем инфу о пользователе
    .then((data) => {
        editProfile.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

api.userAvatarGet() //получаем картинку аватара из серевера
    .then((data) => {
        avatarPic.src = data.avatar;
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
 
api.getAllCards()
    .then((data) => {
    const cardsList = new Section({ //генерация карточек из массива через слой Section
    items: data,
    renderer: (item) => {  
    const card = addCard(editProfile, item);
        cardsList.addItem(card);
        }}, '.elements');        
    cardsList.renderItems();})  //прориосовали
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); //прориосовали

export const popupEdit = new PopupWithForm ('#edit', (input) => { //создаем попап формы редактирования данных о пользователе
    api.PostUserInfo(input.name, input.job)
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    setUserInformation(input)}, () => {});
popupEdit.setEventListeners(); //вешаем на эту форму слушатели
 

export const popupAdd = new PopupWithForm ('#add', (object) => { //создали попап добавления карточки
    const array = [];
    array.push(object);
    const formPopupCard = new Section({
        items: array,
        renderer: (item) => {
            api.addNewCard(item.name_pic, item.link)
            .then((data) => {
            const card = addCard(editProfile, data);
            formPopupCard.addItem(card);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
}}, '.elements');
       formPopupCard.renderItems();
 }, () => {}); 
 popupAdd.setEventListeners(); //вешаем слушатели на форму добавления новой карточки
 
export const popupAvatar = new PopupWithForm ('#changeavatar', (object) => { //создали попап добавления карточки
    api.userAvatarUpdate(object.avatar)
        .catch((err) => {
             console.log(err); // выведем ошибку в консоль
              });;
    avatarPic.src = object.avatar}, () => {}); 
popupAvatar.setEventListeners();


 const popupWithImage = new PopupWithImage ('#picture'); //создаем попап картинки во весь экран
 popupWithImage.setEventListeners(); //вешаем на эту форму слушатели

editButton.addEventListener('click', ()=> { //слушаем кнопку открытия окна редактирования профиля
    popupEdit.open();
    const popupEditObject = editProfile.getUserInfo(); 
    setUserInformation(popupEditObject); //исполнили функцию
    });
 
addButton.addEventListener('click', () => { //открытие попапа для добавления карточки
    popupAdd.open();
});

avatar.addEventListener('click', () => { //слушаем картинку аватара
    popupAvatar.open();
})
 
function handleCardClick(data) { //функция открытия карточки в полный размер
    const fullPicture = document.querySelector('.popup__picture')
    fullPicture.src = data.link
    fullPicture.textContent = data.name
    popupWithImage.open(data.name, data.link);
}

function setUserInformation (input) { //функция добавления информации о пользователе в инпутах
    const userName = document.querySelector('.profile__name');
    const userJob = document.querySelector('.profile__profession');
    userName.textContent = input.name;
    userJob.textContent = input.job;
    formName.value = input.name;
    formJob.value = input.job;

}

function addCard (user, data) { //функция добавления карточки
    const card = new Card (user, data, cardTemplate, () =>  {handleCardClick(data)}, () => {removeCardFunction(data)}, () => {likeCardFunction(data)}); 
    return card.createCard(data);
}

function removeCardFunction (data) { // колбэк удаления карточки
    deleteQuestion.open();
    const yesButton = document.querySelector('#questionButton');
    yesButton.addEventListener('click', ()=> {
        deleteQuestion.close();
        api.removeCard(data._id);})
}

function likeCardFunction (data) { //колбэк лайка карточки 
    let i = 0;
    data.likes.forEach ((like) => {
      if (like._id !== 'b7c08a2d642b994c394c506b') {
        i = i + 0;
      } 
      else {
          i = i + 1;
      }
    })
    if (i === 0) {
        api.setLike(data._id)
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });;

    }
    else {
        api.deleteLike(data._id)
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
    }
}
