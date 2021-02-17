export class Validator {
    constructor (settings, form) {
      this._formSelector = settings.formSelector;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
      this._form = form;
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`.${inputElement.id}`);
      inputElement.classList.add(this._inputErrorClass);
      inputElement.style.borderBottom = "1px solid red";
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent='';
  };
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }; 
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
          this._hideInputError(inputElement);
        }
  };
  
  _setEventListeners(){
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(this._form);
    };
  }