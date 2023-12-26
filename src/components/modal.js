export {closeModal, openModal}

function closeModal (popup) {
popup.classList.remove('popup_is-opened');
document.removeEventListener('keydown', closeEscModal);
popup.removeEventListener('click', closeToOverlay);
}

function openModal (popup) {
popup.classList.add('popup_is-opened');
document.addEventListener('keydown', closeEscModal);
popup.addEventListener('click', closeToOverlay);
}

//закрытие на оверлей
function closeToOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.target);
    }
  }

//закрытие по клавиатуре
function closeEscModal (evt) {
    if (evt.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
    }
  }