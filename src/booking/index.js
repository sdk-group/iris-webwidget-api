(function() {
  var token = "%TOKEN%";
  var server = "http://%SERVER%:%PORT%";

  var request = function(uri, data) {
    data = data || {};
    data.token = token;
    var url = server + uri;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(d => d.json()).then(d => {
      if (!d.state) return Promise.reject(d.reason);
      return d.value
    })
  };
  /** @namespace */
  window.IRIS = window.IRIS || {};
  /**
   * @namespace
   */
  window.IRIS.webwidget = {
    /**
     * getTerminals - возвращает все доступные терминалы
     *
     * @return {Object}  хэш-мап, ключи - id терминалов, значение - инфо о терминале
     */
    getTerminals() {
      return request('/agent/info').then(d => d.ws_available);
    },

    /**
     * getTerminalLayout - возвращает достпные раскладки услуг в виде дерева услуг
     *
     * @param  {type} terminal_id -  id терминала
     * @return {Object}
     */
    getTerminalLayout(terminal_id) {
      return request('/terminal/bootstrap', {
        workstation: terminal_id
      }).then(d => d.views)
    },

    /**
     * getAvailableDays - возвращает доступные для записи дни
     *
     * @param  {Object} ticket_query - объект с параметрами запроса
     * @return {Object}              description
     */
    getAvailableDays(ticket_query) {
      return request('/prebook/available-days', ticket_query).then(d => d.days)
    },

    /**
     * getDaySlots - возвращает достпные слоты для записи на указанный день
     *
     * @param  {Object} ticket_query - объект с параметрами запроса
     * @return {Object}
     */
    getDaySlots(ticket_query) {
      return request('/prebook/ticket-observe', ticket_query).then(d => d.slots)
    },

    /**
     * confirmTicket - регистрация талона предварительной записи
     *
     * @param  {Object} ticket_query - объект с параметрами запроса
     * @return {Object}
     */
    confirmTicket(ticket_query) {
      return request('/prebook/ticket-confirm', ticket_query)
    }
  };

})();