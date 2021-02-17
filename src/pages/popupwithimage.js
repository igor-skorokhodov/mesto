import {Popup} from './popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
       super(popupSelector);
       this._popup = document.querySelector(popupSelector);
       this._name = name;
       this._link = link;
    }

open() {
        this._popup.classList.add('popup_active');
        const fullPicture = document.querySelector('.popup__picture');
        const textPicture = document.querySelector('.popup__sign');
        fullPicture.src = this._link;
        fullPicture.alt = "Место крупным планом";
        textPicture.textContent = this._name;
    }

     close() {
        this._popup.classList.remove('popup_active');
        const fullPicture = document.querySelector('.popup__picture');
        const textPicture = document.querySelector('.popup__sign');
        fullPicture.src = "";
        fullPicture.alt = "";
        textPicture.textContent = "";
    }

}
