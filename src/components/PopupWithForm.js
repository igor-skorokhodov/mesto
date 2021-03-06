import {Popup} from './popup'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, postUserInfo) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupSelector = popupSelector;
        this._form = this._popup.querySelector('.popup__form-input');
        this._postUserInfo = postUserInfo;
        
    }

   

setEventListeners() {
          this._form.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues());
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
        //this._formValues.name = this._formValues.name_pic;
        // возвращаем объект значений
        return this._formValues;
     
      } 


close () {
  this._form.reset();
      super.close();
  }
}