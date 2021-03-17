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
const avatar = document.querySelector('.profile__avatar-container');
const formName = document.querySelector('.popup__form_info_name');
const formJob = document.querySelector('.popup__form_info_job');
const avatarPic = document.querySelector('.profile__avatar');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__profession');


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


Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
    api.getUserInfo(),
    api.getAllCards()
      ])
        .then((values)=>{  //попадаем сюда, когда оба промиса будут выполнены
            editProfile.setUserInfo(values[0]);
            editProfile.setAvatar(values[0]);
            values[1].reverse();
            values[1].forEach ((value) => { const card = addCard(editProfile, value);
                formPopupCard.addItem(card);});
            formPopupCard.renderItems(values[1]);
           })  //прориосовали
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); //все данные получены, отрисовываем страницу
     

editButton.addEventListener('click', ()=> { //слушаем кнопку открытия окна редактирования профиля
    popupEdit.open();
    setUserInfoValueInformation ();
})

const editSaveButton = document.querySelector('.popup__submit-button'); 

export const popupEdit = new PopupWithForm ('#edit', (input) => {//создаем попап формы редактирования данных о пользователzя 
    editSaveButton.innerText = "Сохранение..."; //кнопка меняет свой текст при сохранении данных формы на сервере
    api.postUserInfo(input.name, input.job) //загружаем данные формы о пользователе на сервер 
    .then((input) => {
            editProfile.setUserInfo(input);;
            popupEdit.close();
            })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {editSaveButton.innerText = 'Сохранить';})
    }, () => {})
    
    
 popupEdit.setEventListeners();  //вешаем на эту форму слушатели


 const formPopupCard = new Section( //создали глобально экземпляр класса Section
()  => {}, '.elements');


const addSaveButton = document.querySelector('#saveAddButton'); 

 export const popupAdd = new PopupWithForm ('#add', (object) => { //создали попап добавления карточки
    addSaveButton.innerText = 'Сохранение...'; //кнопка меняет свой текст при сохранении данных формы на сервере
    const array = [];
    array.push(object);
    api.addNewCard(object.name_pic, object.link)
        .then((data) => {
        const card = addCard(editProfile, data);
        formPopupCard.addItem(card);
        popupAdd.close();
        addSaveButton.innerText = 'Сохраннить';
        addSaveButton.disabled = true;
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
        .finally(() => {addSaveButton.innerText = 'Сохранить';})
       formPopupCard.renderItems(array);},
() => {},  () => {}); 
 popupAdd.setEventListeners(); //вешаем слушатели на форму добавления новой карточки
 
 const avatarSaveButton = document.querySelector('#avatarSaveButton'); 

 export const popupAvatar = new PopupWithForm ('#changeavatar', (object) => { //создали попап обновления аватара на сервере
    avatarSaveButton.innerText = 'Сохранение...'; //кнопка меняет свой текст при сохранении данных формы на сервере
    api.userAvatarUpdate(object.avatar)
        .then(function () {
                popupAvatar.close();
                avatarPic.src = object.avatar;
            })
        .catch((err) => {
             console.log(err); // выведем ошибку в консоль
              })
        .finally(() => {avatarSaveButton.innerText = 'Сохранить';})
    }, () => {});
popupAvatar.setEventListeners();


 const popupWithImage = new PopupWithImage ('#picture'); //создаем попап картинки во весь экран
 popupWithImage.setEventListeners(); //вешаем на эту форму слушатели


 
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

function setUserInfoValueInformation () { //функция прописания данных в полях формы
    formName.value = userName.textContent;
    formJob.value = userJob.textContent;
}

function addCard (user, data) { //функция добавления карточки
    const card = new Card (user, data, cardTemplate, () =>  {handleCardClick(data)}, () => {removeCardFunction(card, data)}, () => {likeCardFunction(card, data)}); 
    return card.createCard(data);
}

const deleteSaveButton = document.querySelector('#questionButton'); //кнопка меняет свой текст при удалении карточки с сервера

function removeCardFunction (card, data) { // колбэк удаления карточки
    deleteQuestion.open();
    deleteSaveButton.addEventListener('click', () => {
        deletingCard(card, data);
        deleteSaveButton.innerText = 'Удаление...';},  {once: true})
}

function deletingCard (card, data) { //вывели апи удаления в отдельную функцию
    api.removeCard(data._id)
    .then(() => {
    deleteQuestion.close();
    card.deleteCard()})
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
         })
    .finally(() => {deleteSaveButton.innerText = 'Да';})
}

function likeCardFunction (card, data) { //колбэк лайка карточки 
    if (card.isLiked(data)) {
        api.setLike(data._id)
        .then(() => {
            card.likeCard(data);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
    }
    else {
        api.deleteLike(data._id)
        .then(() => {
            card.dislikeCard(data);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
    }
}