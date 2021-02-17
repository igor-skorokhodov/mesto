import {Popup} from './popup'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupSelector = popupSelector;
        this._element = document.querySelector(this._popupSelector);
    }


setEventListeners() {
          this._handleFormSubmit(this._getInputValues());
          super.setEventListeners();
        }
      

_getInputValues() {
        // достаём все элементы полей
        this._inputList = document.querySelectorAll(this._popupSelector);
      
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
      document.querySelector('#form_add').reset();
      super.close();
  }
}