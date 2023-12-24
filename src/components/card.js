import { openModal } from "./modal.js";
import { deleteCards } from "../index.js";

const popupConfidence = document.querySelector('.popup_confidence');
const cardTemplate = document.querySelector('#card-template').content;
function createCards (item, likeToCard, openImagePopup, myId) {
    const element = cardTemplate.cloneNode(true);
    element.querySelector('.card__title').textContent = item.name;
    const cardLikeCount = element.querySelector('.card__like-count');
    cardLikeCount.textContent = item.likes.length;
    const cardImage = element.querySelector('.card__image');
    const deleteButton = element.querySelector('.card__delete-button');
    item.likes.forEach(function(like) {
      if (like._id === myId) {
        element.querySelector('.card__like-button').classList.add('card__like-button_is-active'); 
      }
    })   
    cardImage.src = item.link;
    cardImage.alt = item.name;
    if (myId === item.owner._id) {
      deleteButton.addEventListener('click', function () {
        removeCard(item, deleteButton);
      }) 
    } else {
      deleteButton.remove();
    }   
    element.querySelector('.card__like-button').addEventListener('click', function (evt) {      
      likeToCard(evt, item, cardLikeCount); 
    });
    cardImage.addEventListener('click', function () {
      openImagePopup(item);
    })
    return element;
}

function removeCard(card, deleteButton) {
  openModal(popupConfidence);
  document.querySelector('.popup__button-delete').addEventListener('click', function (evt) {
    deleteCards(card._id, deleteButton.closest('.places__item'))
  })
}

export {createCards, removeCard }







