class Ajax {
  /**
   * GET запрос
   * @param {string} url - Адрес запроса
   * @param {function} callback - Функция обратного вызова (data, status)
   */
  get(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              this._handleResponse(xhr, callback);
          }
      };
  }

  /**
   * POST запрос
   * @param {string} url - Адрес запроса
   * @param {object} data - Данные для отправки
   * @param {function} callback - Функция обратного вызова (data, status)
   */
  post(url, data, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              this._handleResponse(xhr, callback);
          }
      };
  }

  /**
   * PATCH запрос
   * @param {string} url - Адрес запроса
   * @param {object} data - Данные для обновления
   * @param {function} callback - Функция обратного вызова (data, status)
   */
  patch(url, data, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              this._handleResponse(xhr, callback);
          }
      };
  }

  /**
   * DELETE запрос
   * @param {string} url - Адрес запроса
   * @param {function} callback - Функция обратного вызова (data, status)
   */
  delete(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              this._handleResponse(xhr, callback);
          }
      };
  }

  /**
   * Обработчик ответа (приватный метод)
   * @param {XMLHttpRequest} xhr - Объект запроса
   * @param {function} callback - Функция обратного вызова
   */
  _handleResponse(xhr, callback) {
      try {
          const contentType = xhr.getResponseHeader('Content-Type');
          let data = null;
          
          if (contentType && contentType.includes('application/json') && xhr.responseText) {
              data = JSON.parse(xhr.responseText);
          }
          
          callback(data, xhr.status);
      } catch (e) {
          console.error('Ошибка парсинга JSON:', e);
          callback(null, xhr.status);
      }
  }
}

export const ajax = new Ajax();