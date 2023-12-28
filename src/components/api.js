

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
  .then(res => {
    return getResponseData(res);
  })  
}

function getCards () { 
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => {
    return getResponseData(res);
  })
}

function apiHandleFormSubmitAdd(titleInput, linkInput) {
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
    .then((res) => {
      return getResponseData(res);
    }) 
}
function apiHandleFormSubmitEdit(nameInput, jobInput) {
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
  .then((res) => {
    return getResponseData(res);
  }) 
}

function apiHandleFormSubmitAvatar(avatarInput) {
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
  .then((res) => {
    return getResponseData(res);
  }) 
}

function toLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
    
  })
  .then((res) => {
    return getResponseData(res);
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
    return getResponseData(res);
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
    return getResponseData(res);
  })
}


function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
  
}

export {getUsers, getCards, apiHandleFormSubmitAdd, apiHandleFormSubmitEdit, apiHandleFormSubmitAvatar, toLike, toDislike, apiDeleteCard, getResponseData}
  