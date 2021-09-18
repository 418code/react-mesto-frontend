import { apiConfig } from './utils';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Sends a network request with given parameters
   * @param {String} path - the last part of full url
   * @param {String} method - 'GET || 'POST' || 'PATCH' || 'PUT' || 'DELETE'
   * @param {String} body - is added with some methods
   * @returns {Promise}
   */
  _fetchPath(path, method, body = {}) {
    const fetchObject = {
      method: method,
      headers: this._headers,
    }
    if (method === 'POST' || method === 'PATCH')
      fetchObject['body'] = JSON.stringify(body);

    return fetch(`${this._baseUrl}${path}`, fetchObject)
    .then(res => {
      if (res.ok)
        return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

class  DataApi extends Api {

  /**
   * Gets user profile information
   * @returns {Promise}
   */
  getUserInfo() {
    return this._fetchPath('users/me', 'GET');
  }

  /**
   * Sets user profile information
   * @param {Object} object - {name, about}
   * @returns {Promise}
   */
  setUserInfo({ name, about }) {
    return this._fetchPath('users/me', 'PATCH', {name: name, about: about});
  }

  /**
   * Tries to save a link to a new user avatar to the server
   * @param {String} url
   * @returns {Promise}
   */
  setUserAvatar(url) {
    return this._fetchPath('users/me/avatar', 'PATCH', {avatar: url});
  }

  /**
   * Loads cards from the server
   * @returns {Promise}
   */
  getInitialCards() {
    return this._fetchPath('cards', 'GET');
  }

  /**
   * Adds a new card to the server
   * @param {Object} object - {name, link}
   * @returns {Promise} - contains new card data
   */
  addCard({ name, link }) {
    return this._fetchPath('cards', 'POST', {name: name, link: link});
  }

  /**
   * Removes card from server
   * @param {String} cardId
   * @returns {Promise}
   */
  deleteCard(cardId) {
    return this._fetchPath(`cards/${cardId}`, 'DELETE')
  }

  /**
   * Changes card like state on the server
   * @param {String} cardId
   * @returns {Promise}
   */
  changeLikeCardStatus(cardId, isLiked) {
    return this._fetchPath(`cards/likes/${cardId}`, isLiked ? 'DELETE' : 'PUT');
  }
}

class AuthApi extends Api {

  /**
   * Creates authentication headers with a jwt token
   * @param {String} token
   */
  _makeAuthHeaders(token) {
    this._authHeaders = {
      'Content-Type': apiConfig.appJSONType,
      'Authorization' : `Bearer ${token}`
    }
  }

  /**
   * Creates a new user on the server
   * @param {Object} object - {email, password}
   * @returns {Promise}
   */
  register( {email, password} ) {
    return this._fetchPath('signup', 'POST', {email: email, password: password});
  }

  /**
   * Signs in the user to the server
   * @param {Object} object - {email, password}
   * @returns {Promise}
   */
  signIn({ email, password }) {
    return this._fetchPath('signin', 'POST', {email: email, password: password});
  }

  /**
   * Tests the validity of jwt token
   * @param {String} token
   * @returns
   */
  checkToken(token) {
    const prevHeaders = this._headers;
    this._makeAuthHeaders(token);
    this._headers = this._authHeaders;
    const request = this._fetchPath('users/me', 'GET');
    this._headers = prevHeaders;
    this._makeAuthHeaders(''); //avoid storing the token in api object
    return request;
  }
}

//prepare api objects for use

const api = new DataApi({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: apiConfig.authorization,
    'Content-Type': apiConfig.appJSONType
  }
});

const authApi = new AuthApi({
  baseUrl: apiConfig.authBaseUrl,
  headers: {
    'Content-Type': apiConfig.appJSONType
  }
});

export { api, authApi };
