let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
let popUp = document.querySelector('.popup');
let placeHolderName = name.textContent;
let placeHolderProfession = profession.textContent;
let formElementName = document.querySelector('.popup__form-name');
let formElementJob = document.querySelector('.popup__form-job');



function addPopup() {
   popUp.classList.add('popup_active');
   formElementName.value = name.textContent;
   formElementJob.value = profession.textContent;
}

function closePopup() {
    popUp.classList.remove('popup_active');
 }

 function editInfo () {
    function formSubmitHandler (evt) {
        evt.preventDefault();
    }
    let nameInput = formElementName.value;
    let jobInput = formElementJob.value;
    name.textContent=nameInput;
    profession.textContent=jobInput;
    closePopup();
 }
 
 editButton.addEventListener('click', addPopup); 
 closeButton.addEventListener('click', closePopup);
 submitButton.addEventListener('click', editInfo);






