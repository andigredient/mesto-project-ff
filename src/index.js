import {closeModal, openModal} from './components/modal.js';
import {enableValidation} from './components/validation.js';
import { createCards, removeCard } from './components/card.js';
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
const profileDescription = document.querySelector('.profile__description');
const popupButton = document.querySelectorAll('.popup__button');
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.name;
const popupConfidence = document.querySelector('.popup_confidence');
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
  errorClass: 'form__input-error_active'
};

formEditProfile.addEventListener('submit', handleFormSubmitEdit);
formAddCard.addEventListener('submit', handleFormSubmitAdd);
formAvatar.addEventListener('submit', handleFormSubmitAvatar);
//-----------------------------------------------------------------------------------------------

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading);  
  //profileTitle.textContent = nameInput.value;//---
  //profileDescription.textContent = jobInput.value;//---
  apiHandleFormSubmitEdit()
  .catch((err) => {
    console.log(err); 
  })
  .finally (() => renderLoading(false, buttonLoading))
  .then (() => {
    closeModal(popupEdit);
  })
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading);
  apiHandleFormSubmitAdd()
  .catch((err) => {
    console.log(err); 
  })
  .finally (() => renderLoading(false, buttonLoading))
  .then (() => {
    closeModal(popupAdd);
  })
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading)
  apiHandleFormSubmitAvatar()
  .catch((err) => {
    console.log(err);
  })
  .finally (() => renderLoading(false, buttonLoading))
  .then (() => {
    closeModal(popupAvatar);
  })
}

//-----------------------------------------------------------------------------------------------

//попап с аватаром
profileImg.addEventListener('click', function() {
  formAvatar.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAvatar.reset();
  inputCardLink.classList.remove('input-error');  
  inputCardLink.classList.add('input-not-error'); 

  const errorHide = document.querySelectorAll('.form__input-error_active');
  errorHide.forEach((data) => {
    data.textContent='';
  })   
  openModal(popupAvatar);
})

//попап с редактированием
buttonEdit.addEventListener('click', function() {
    inputPopupName.value = profileTitle.textContent;
    inputPopupDescription.value = profileDescription.textContent;
    const errorHide = document.querySelectorAll('.form__input-error_active');
    errorHide.forEach((data) => {
      data.textContent='';
    })
    openModal(popupEdit);
  })
  
  //попап с добавлением картинки
  buttonAdd.addEventListener('click', function() {
  formAddCard.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAddCard.reset();
  inputCardName.classList.remove('input-error');  
  inputCardName.classList.add('input-not-error');  
  inputCardLink.classList.remove('input-error');  
  inputCardLink.classList.add('input-not-error');  

  const errorHide = document.querySelectorAll('.form__input-error_active');
  errorHide.forEach((data) => {
    data.textContent='';
  })
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
    const userId = item.owner._id;
    const imgId = item._id;
    placesList.append(createCards(item, likeToCard, openImagePopup, myId, userId, imgId))
  });
}
)

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

function likeToCard (evt, item, likeCount) {
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    toLike(item._id)    
    .then((res) => {
      likeCount.textContent = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');     
    }) 
  }
  if (evt.target.classList.contains('card__like-button_is-active')) {
    toDislike(item._id)       
    .then((res) => {
      likeCount.textContent = res.likes.length;
      evt.target.classList.toggle('card__like-button_is-active');     
    }) 
  }
}

function deleteCards (id, card) {
  apiDeleteCard(id)
  .then(() => {
    card.remove();
    closeModal(popupConfidence);
  })
}

export { titleInput, linkInput, nameInput, jobInput, avatarInput, deleteCards}
