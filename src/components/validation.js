
function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);    
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
    inputElement.classList.add(validationConfig.inputError);
  };  
  
  function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(validationConfig.inputError);  
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
  }  
  
  function disabledButton (formElement, checkButton) { 
    const isFormValid  = formElement.checkValidity(); 
    if (isFormValid) { 
      checkButton.removeAttribute('disabled'); 
    } else { 
      checkButton.setAttribute('disabled', 'true'); 
    } 
  };   
  
  
  function setEventListeners (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const checkButton = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig)
        disabledButton(formElement, checkButton);
      });
    });
  }; 
  
  function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };
  
function clearError (form, validationConfig) {
  const inputList = form.querySelectorAll(validationConfig.inputSelector);
   inputList.forEach((data) => {
    hideInputError(form, data, validationConfig);
  })

}

export {enableValidation, clearError}  