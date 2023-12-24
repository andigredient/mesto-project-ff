export {closeModal, openModal}

function closeModal (popup) {
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', closeEscModal);
document.removeEventListener('click', closeToOverlay);
}

function openModal (popup) {
 // if (popup !== document.querySelector('.popup_type_edit') && popup !== document.querySelector('.popup__button-delete')) {
  //  popup.querySelector('.popup__button').setAttribute('disabled', 'true');
  //}
popup.classList.add('popup_is-opened');
document.addEventListener('keydown', closeEscModal);
document.addEventListener('click', closeToOverlay);

const errorHide = document.querySelectorAll('.form__input-error_active');
errorHide.forEach((data) => {
  data.textContent='';
})

const inputForm = document.querySelectorAll('.popup__input');
inputForm.forEach((input) => {
  input.style.borderBottom = "1px solid rgba(0, 0, 0, .2)" ;
})
}

//закрытие на оверлей
function closeToOverlay(evt) {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    if (evt.target === popupIsOpened) {
      closeModal(popupIsOpened);
    }
  }

//закрытие по клавиатуре
function closeEscModal (evt) {
    if (evt.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
    }
  }