import {titleInput, linkInput, nameInput, jobInput, avatarInput} from './index.js';


const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: '0c97493c-ee07-4dd0-9f91-803e8ac0bd98',
      'Content-Type': 'application/json'
    }
  }  

function getUsers () { 
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
config.headers
function getCards () { 
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function apiHandleFormSubmitAdd() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
      },
      body: JSON.stringify({
        name: titleInput.value,
        link: linkInput.value        
      })
    }) 
}
function apiHandleFormSubmitEdit() {
return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })  
}
function apiHandleFormSubmitAvatar() {
return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: avatarInput.value,
    })
  })
}

function toLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  })  
}

function toDislike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
  if (res.ok) {
    return res.json(); 
  }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function apiDeleteCard (id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    if (res.ok) {
    return res.json(); 
    }
  })
}

export {getUsers, getCards, apiHandleFormSubmitAdd, apiHandleFormSubmitEdit, apiHandleFormSubmitAvatar, toLike, toDislike, apiDeleteCard}
  