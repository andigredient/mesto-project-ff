
function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    
    
    
    if (inputElement.validity.tooShort) {errorElement.textContent = 'Минимальная длина - 2 символа'} else {
    errorElement.textContent = errorMessage;
    }
    errorElement.classList.add(validationConfig.errorClass);
    inputElement.classList.add(validationConfig.inputError);
    inputElement.classList.remove(validationConfig.inputNotError);
  };  
  
  function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputError);  
    inputElement.classList.add(validationConfig.inputNotError);  

    
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
    const isFormValid  = formElement.checkValidity(); 
    const checkButton = formElement.querySelector(validationConfig.submitButtonSelector);
      if (isFormValid) { 
        checkButton.removeAttribute('disabled'); 
      } else { 
        checkButton.setAttribute('disabled', 'true'); 
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
  
function clearError (inputForm, validationConfig) {
  const errorHide = inputForm.querySelectorAll(validationConfig.formInputErrorActive);
   errorHide.forEach((data) => {
   data.textContent='';
  })

}

export {enableValidation, clearError}  