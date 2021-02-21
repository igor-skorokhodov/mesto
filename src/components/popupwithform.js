import {Popup} from './popup'
import {popupAdd} from '../pages/index.js'
import {popupEdit} from '../pages/index.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupSelector = popupSelector;
        this._form = this._popup.querySelector('.popup__form-input');
        
    }


setEventListeners() {
          this._form.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
            popupAdd.close();
            popupEdit.close();
          });
          super.setEventListeners();
        }
      

_getInputValues() {
        // достаём все элементы полей
        
        this._inputList = document.querySelectorAll('.popup__form');
        // создаём пустой объект
        this._formValues = {};
      
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
     
      } 


close () {
  this._popup.querySelector('.popup__form-input').reset();
      super.close();
  }
}