const settings = {
    formSelector: '.popup__form-input',
    inputSelector: '.popup__form',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'form__inactive',
    inputErrorClass: 'popup__form-error',
    errorClass: 'popup__form_error-active'
}

const showInputError = (obj, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};
      
const hideInputError = (obj, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent='';
};

const toggleButtonState = (obj, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };   
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 


const isValid = (obj, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(obj, formElement, inputElement, inputElement.validationMessage);
    } else {
          hideInputError(obj, formElement, inputElement);
        }
};

const setEventListeners = (obj, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(obj, inputList, buttonElement);
    if (buttonElement.classList.contains('popup__submit-button')) {
        buttonElement.classList.remove('form__inactive');
        buttonElement.disabled = false;
    }
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(obj, formElement, inputElement)
        toggleButtonState(obj, inputList, buttonElement);
      });
    });
  }; 
 
  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(obj, formElement);
    });
  };

  enableValidation(settings);

