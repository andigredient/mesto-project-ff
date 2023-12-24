
function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    inputElement.classList.add('input-error');
    inputElement.classList.remove('input-not-error');
  };  
  
  function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove('input-error');  
    inputElement.classList.add('input-not-error');  
  };
  
  function isValid (formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.message);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
    disabledButton(formElement, validationConfig);
  }  
  
  function disabledButton (formElement, validationConfig) {
    const inputArray = formElement.querySelectorAll(validationConfig.inputSelector);
    for (let i = 0; i <= inputArray.length-1; i++ ) {
      if (inputArray[i].validity.valid && inputArray[i] !== "") {
        formElement.querySelector(validationConfig.submitButtonSelector).removeAttribute('disabled');
      } else {
        formElement.querySelector(validationConfig.submitButtonSelector).setAttribute('disabled', 'true');
        break;
      }
    } 
  };  
  
  function setEventListeners (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig)
      });
    });
  }; 
  
  function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };
  
export {enableValidation}  