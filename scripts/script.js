let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.popup__submit-button');
let name = document.querySelector('.profile__name');
let profession = document.querySelector('.profile__profession');
let popUp = document.querySelector('.popup');
let placeHolderName = name.textContent;
let placeHolderProfession = profession.textContent;
let formElementName = document.querySelector('.popup__form_info_name');
let formElementJob = document.querySelector('.popup__form_info_job');
let form = document.querySelector('.popup__form-input')



function addPopup() {
   popUp.classList.add('popup_active');
   formElementName.value = name.textContent;
   formElementJob.value = profession.textContent;

}

function closePopup() {
    popUp.classList.remove('popup_active');
 }

 function editInfo (evt) {
   evt.preventDefault();
   name.textContent=formElementName.value;
   profession.textContent=formElementJob.value;
   closePopup();
}
 
 editButton.addEventListener('click', addPopup); 
 closeButton.addEventListener('click', closePopup);
 form.addEventListener('submit', editInfo);






