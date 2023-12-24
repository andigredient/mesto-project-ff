export {closeModal, openModal}

function closeModal (popup) {
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', closeEscModal);
document.removeEventListener('click', closeToOverlay);
}

function openModal (popup) {
popup.classList.add('popup_is-opened');
document.addEventListener('keydown', closeEscModal);
document.addEventListener('click', closeToOverlay);
const inputForm = document.querySelectorAll('.popup__input');
inputForm.forEach((input) => {
  input.classList.add('input-not-error');
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