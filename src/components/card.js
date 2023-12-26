import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;
let boom
let chaka

function createCards (item, likeHandler, openImagePopup, deleteHandler, myId, popupConfidence) {
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
          chaka = item._id;
          boom = deleteButton;

        removeCard(item, deleteButton, deleteHandler, popupConfidence);
      }) 
    } else {
      deleteButton.remove();
    }   
    element.querySelector('.card__like-button').addEventListener('click', function (evt) {      
      likeHandler (evt, item, cardLikeCount); 
    });
    cardImage.addEventListener('click', function () {
      openImagePopup(item);
    })
    return element;
  }

function removeCard(card, deleteButton, deleteHandler, popupConfidence) {
  openModal(popupConfidence)
  
}

function deleteCards (card, popupConfidence) {  
    card.remove();
    closeModal(popupConfidence);
}


function likeToCard (evt, likeCount, res) {
  likeCount.textContent = res.likes.length;
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCards, removeCard, deleteCards, likeToCard, boom, chaka }







