const cardTemplate = document.querySelector('#card-template').content;


function createCards (item, likeHandler, openImagePopup, myId, removeCard) {
    const element = cardTemplate.querySelector('.places__item').cloneNode(true);
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
        removeCard(item, element);
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

function deleteCards (card) { 
  card.remove();
}

function likeToCard (evt, likeCount, res) {
  likeCount.textContent = res.likes.length;
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCards, deleteCards, likeToCard}







