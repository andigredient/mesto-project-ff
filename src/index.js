import {closeModal, openModal} from './components/modal.js';
import {enableValidation, clearError} from './components/validation.js';
import { createCards, deleteCards, likeToCard, varDelete, varItemId } from './components/card.js';
import { getUsers, getCards, apiHandleFormSubmitAdd, apiHandleFormSubmitEdit, apiHandleFormSubmitAvatar, toLike, toDislike, apiDeleteCard } from './components/api.js';
import './pages/index.css';

//const popup = document.querySelector('.popup');
const placesList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');
const buttonsClosePopup = document.querySelectorAll('.popup__close'); 
const inputPopupName = document.querySelector('.popup__input_type_name');
const inputPopupDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const popupConfidence = document.querySelector('.popup_confidence');
const profileDescription = document.querySelector('.profile__description');
const popupButton = document.querySelectorAll('.popup__button');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const formAddCard = document.forms['new-place'];
const formAvatar = document.forms['form-avatar'];
const profileImg = document.querySelector('.profile__image');
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_url');
const buttonDelete= document.querySelectorAll('.card__delete-button');
const popupAvatar = document.querySelector('.popup_avatar');
const titleInput = formAddCard['place-name'];
const linkInput = formAddCard.link;
const avatarInput = formAvatar['place-avatar'];
const imagePopup = document.querySelector('.popup_type_image');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  inputError: 'input-error',
  formInputErrorActive: '.form__input-error_active'
};

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAddCard.addEventListener('submit', handleFormSubmitAdd);
formAvatar.addEventListener('submit', handleFormSubmitAvatar);
//-----------------------------------------------------------------------------------------------

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading);  
  apiHandleFormSubmitEdit(nameInput, jobInput)
  .then ((res) => {
    const profileTitle = document.querySelector('.profile__title');
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(popupEdit);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally (() => renderLoading(false, buttonLoading))
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading);
  apiHandleFormSubmitAdd(titleInput, linkInput)
  .then ((res) => {
    placesList.prepend(createCards(res, likeHandler, openImagePopup, deleteHandler, res.owner._id, popupConfidence, removeCard))
    closeModal(popupAdd);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally (() => renderLoading(false, buttonLoading))
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading)
  apiHandleFormSubmitAvatar(avatarInput)
  .then ((res) => {
    profileImg.style.backgroundImage = `url("${res.avatar}"`;
    closeModal(popupAvatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally (() => renderLoading(false, buttonLoading))
}

//-----------------------------------------------------------------------------------------------

//попап с аватаром
profileImg.addEventListener('click', function() {
  formAvatar.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAvatar.reset();
  inputCardLink.classList.remove('input-error');  
  const inputForm = formAvatar.querySelectorAll('.popup__input');
  clearError(formAvatar, validationConfig);
  inputForm.forEach((input) => {
}) 
  openModal(popupAvatar);
})

//попап с редактированием
buttonEdit.addEventListener('click', function() {
    inputPopupName.value = profileTitle.textContent;
    inputPopupDescription.value = profileDescription.textContent;    
    const inputForm = formEditProfile.querySelectorAll('.popup__input');
    clearError(formEditProfile, validationConfig);
    inputForm.forEach((input) => {
    }) 
    openModal(popupEdit);
  })
  
  //попап с добавлением картинки
  buttonAdd.addEventListener('click', function() {
  formAddCard.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAddCard.reset();
  inputCardName.classList.remove('input-error');  
  inputCardLink.classList.remove('input-error');  
  const inputForm = formAddCard.querySelectorAll('.popup__input');
  clearError(formAddCard, validationConfig);
  openModal(popupAdd); 
})

//попап с картинками
function openImagePopup (evt) {
  popupImage.setAttribute('src',evt.link);
  popupImage.setAttribute('alt',evt.name);
  popupTitle.textContent = evt.name;
  openModal(imagePopup);  
}

//закрытие на крестик  
buttonsClosePopup.forEach( function (item) {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closeModal(popup)
  });
});

enableValidation(validationConfig);

Promise.all([getCards(), getUsers()])
.then(([cards, user]) => {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  const myId = user._id;
  profileImg.style.backgroundImage = `url(${user.avatar})`; 
  cards.forEach ((item) =>  {    
    placesList.append(createCards(item, likeHandler, openImagePopup, deleteHandler, myId, popupConfidence, removeCard))
  });
})
.catch((err) => {
  console.log(err); 
})


function renderLoading (isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    if (button.closest('.popup_type_new-card')) {
          button.textContent = 'Создать';    
        } else {
          button.textContent = 'Сохранить';
        }
  }
}

function likeHandler (evt, item, likeCount) {
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    toLike(item._id)    
    .then((res) => {
      likeToCard(evt, likeCount, res);     
    })
    .catch((err) => {
      console.log(err); 
    })
  }
  if (evt.target.classList.contains('card__like-button_is-active')) {
    toDislike(item._id)       
    .then((res) => {
      likeToCard(evt, likeCount, res);           
    }) 
    .catch((err) => {
      console.log(err); 
    })
  }  
}

document.querySelector('.popup__button-delete').addEventListener('click', function (evt) {
  deleteHandler()
})

function removeCard(item, element, deleteHandler) {
  varItemId = item._id;
  varDelete = element;
  openModal(popupConfidence)  
}

//element.;

function deleteHandler () {  
  apiDeleteCard(varItemId)
  .then(() => {
    deleteCards(varDelete);
    closeModal(popupConfidence);  
  })
  .then(() => {
  })
  .catch((err) => {
    console.log(err); 
  })
}

export { titleInput, linkInput, nameInput, jobInput, avatarInput, deleteHandler}
