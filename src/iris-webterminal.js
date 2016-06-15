(function () {
	var token = "%TOKEN%";
	var server = "http://%SERVER%:%PORT%";

	var request = function (uri, data) {
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

	window.IRIS = window.IRIS || {};
	window.IRIS.webwidget = {
		getTerminals() {
			return request('/agent/info').then(d => d.ws_available);
		},
		getTerminalLayout(terminal_id) {
			return request('/terminal/bootstrap', {
				workstation: terminal_id
			}).then(d => d.views)
		},
		getAvailableDays(ticket_query) {
			return request('/prebook/available-days', ticket_query)
		},
		getDaySlots(ticket_query) {
			return request('/prebook/ticket-observe', ticket_query)
		},
		confirmTicket(ticket_query) {
			return request('/prebook/ticket-confirm', ticket_query)
		}
	};

})();
