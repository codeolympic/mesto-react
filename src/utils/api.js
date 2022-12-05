class Api {
  constructor({ url, token}) {
    this._url = url;
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers:  {
        authorization: this._token
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers:  {
        authorization: this._token
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  saveUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  saveAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${data.title}`,
        link: `${data.link}`
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }

  // setLikeCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._token
  //     }
  //   })
  //     .then((res) => {
  //       return this._checkResponse(res);
  //     })
  // }

  // deleteLikeCard(cardId) {
  //   return fetch(`${this._url}/cards/${cardId}/likes`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._token
  //     }
  //   })
  //     .then((res) => {
  //       return this._checkResponse(res);
  //     })
  // }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: (isLiked) ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      })
  }
}


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  token: 'e8e9a1c8-a81f-45be-8c26-d679721b86be'
});

export default api;
