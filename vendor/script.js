let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
let namePlaceholder = document.querySelectorAll('.popup__form');
let popUp = document.querySelector('.popup');
let submitButton = document.querySelector('.popup__submit-button');
let heart = document.querySelectorAll('.element__heart');


function addPopup() {
   popUp.classList.add('popup_active');
   let placeHolderName = name.textContent;
   let placeHolderProfession = profession.textContent;
   namePlaceholder[0].setAttribute('value', placeHolderName);
   namePlaceholder[1].setAttribute('value', placeHolderProfession);
}

editButton.addEventListener('click', addPopup); 

function closePopup() {
    popUp.classList.remove('popup_active');
 }

 closeButton.addEventListener('click', closePopup);

 function editInfo () {
    let formElement = document.querySelectorAll('.popup__form');
    function formSubmitHandler (evt) {
        evt.preventDefault();
    }
    let placeHolderName = name.textContent;
    let placeHolderProfession = profession.textContent;
    namePlaceholder[0].setAttribute('value', placeHolderName);
    namePlaceholder[1].setAttribute('value', placeHolderProfession);
    let nameInput = formElement[0].value;
    let jobInput = formElement[1].value;
    name.textContent=nameInput;
    profession.textContent=jobInput;
    popUp.classList.remove('popup_active');
 }
 
 submitButton.addEventListener('click', editInfo);

 let block = '<img src="images/heart_disabled.svg">';

 [].forEach.call(heart, function(item) {
   item.addEventListener('click', function() {
      if (block==='<img src="images/heart_disabled.svg">') {
     item.innerHTML='<img src="images/heart_anabled.png">';
     block = '<img src="images/heart_anabled.png">';
      }else {
         item.innerHTML='<img src="images/heart_disabled.svg">';
         block = '<img src="images/heart_disabled.svg">';
     }
   });
 });

 console.log(heart);



