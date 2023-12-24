import { cardTemplate } from "./index.js";
import { closeModal, openModal } from "./modal.js";
import { toLike, toDislike, apiDeleteCard } from './api.js';

const popupConfidence = document.querySelector('.popup_confidence');


function createCards (item, deleteCards, likeToCard, openImagePopup, myId, userId, imgId) {
    const element = cardTemplate.cloneNode(true);
    element.querySelector('.card__title').textContent = item.name;
    element.querySelector('.card__like-count').textContent = item.likes.length;
    const deleteButton = element.querySelector('.card__delete-button');
    const cardImage = element.querySelector('.card__image');
    const popupConfidence = document.querySelector('.popup_confidence');
    const likeCount = element.querySelector('.card__like-count'); 
    item.likes.forEach(function(like) {
      if (like._id === myId) {
        element.querySelector('.card__like-button').classList.add('card__like-button_is-active'); 
      }
    })   
    cardImage.src = item.link;
    cardImage.alt = item.name;
    if (myId === userId) {
      deleteButton.addEventListener('click', function () {
        openModal(popupConfidence);
        document.querySelector('.popup__button-delete').addEventListener('click', function (evt) {
          deleteCards(imgId, deleteButton.closest('.places__item'));
        });
      });
    } else {
      deleteButton.style.display = "none";
    }
    element.querySelector('.card__like-button').addEventListener('click', function (evt) {      
      likeToCard(evt, item, likeCount); 
    });
    cardImage.addEventListener('click', function () {
      openImagePopup(item);
    })
    return element;
}


//лайк
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
  

export {createCards, deleteCards, likeToCard }







