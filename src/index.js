import {closeModal, openModal} from './modal.js';
import {enableValidation} from './validation.js';
import { deleteCards, createCards, likeToCard } from './card.js';
import { getUsers, getCards, apiHandleFormSubmitAdd, apiHandleFormSubmitEdit, apiHandleFormSubmitAvatar } from './api.js';
import './pages/index.css';

const popup = document.querySelector('.popup');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  apiHandleFormSubmitEdit()
  .finally (() => renderLoading(false, buttonLoading));
  closeModal(popupEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading);
  apiHandleFormSubmitAdd()
  .finally (() => renderLoading(false, buttonLoading));
  closeModal(popupAdd);
}

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const buttonLoading = evt.target.querySelector('.popup__button');
  renderLoading(true, buttonLoading)
  apiHandleFormSubmitAvatar()
  .finally (() => renderLoading(false, buttonLoading));  
  closeModal(popupAvatar);
}

//-----------------------------------------------------------------------------------------------

//попап с аватаром
profileImg.addEventListener('click', function() {
  formAvatar.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAvatar.reset();
  inputCardLink.style.borderBottom = "1px solid rgba(0, 0, 0, .2)";  
  openModal(popupAvatar);
})

//попап с редактированием
buttonEdit.addEventListener('click', function() {
    inputPopupName.value = profileTitle.textContent;
    inputPopupDescription.value = profileDescription.textContent;
    openModal(popupEdit);
  })
  
  //попап с добавлением картинки
  buttonAdd.addEventListener('click', function() {
  formAddCard.querySelector('.popup__button').setAttribute('disabled', 'true');
  formAddCard.reset();
    inputCardName.value="";
    inputCardLink.value="";
    inputCardName.style.borderBottom = "1px solid rgba(0, 0, 0, .2)";
    inputCardLink.style.borderBottom = "1px solid rgba(0, 0, 0, .2)";
    openModal(popupAdd);
})

//попап с картинками
function openImagePopup (evt) {
  const imagePopup = document.querySelector('.popup_type_image');
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
    placesList.append(createCards(item, deleteCards, likeToCard, openImagePopup, myId, userId, imgId))
  });
}
)

function renderLoading (isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = 'Сохранить'
  }
}


export { cardTemplate, titleInput, linkInput, nameInput, jobInput, avatarInput}
