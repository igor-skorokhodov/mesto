import {Popup} from './popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
       super(popupSelector);
       
    }

open(name, link) {
        const fullPicture = document.querySelector('.popup__picture');
        const textPicture = document.querySelector('.popup__sign');
        super.open();
        fullPicture.src = link;
        fullPicture.alt = "Место крупным планом";
        textPicture.textContent = name;
    }

}
