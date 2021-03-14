import {Popup} from './popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
       super(popupSelector);
       this._fullPicture = document.querySelector('.popup__picture');
       this._textPicture = document.querySelector('.popup__sign');
    }

open(name, link) {
        super.open();
        this._fullPicture.src = link;
        this._fullPicture.alt = "Место крупным планом";
        this._textPicture.textContent = name;
    }
}