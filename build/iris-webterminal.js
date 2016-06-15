"use strict";

(function () {
	var token = "%TOKEN%";
	var server = "http://%SERVER%:%PORT%";

	var request = function request(uri, data) {
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
		}).then(function (d) {
			return d.json();
		}).then(function (d) {
			if (!d.state) return Promise.reject(d.reason);
			return d.value;
		});
	};

	window.IRIS = window.IRIS || {};
	window.IRIS.webwidget = {
		getTerminals: function getTerminals() {
			return request('/agent/info').then(function (d) {
				return d.ws_available;
			});
		},
		getTerminalLayout: function getTerminalLayout(terminal_id) {
			return request('/terminal/bootstrap', {
				workstation: terminal_id
			}).then(function (d) {
				return d.views;
			});
		},
		getAvailableDays: function getAvailableDays(ticket_query) {
			return request('/prebook/available-days', ticket_query);
		},
		getDaySlots: function getDaySlots(ticket_query) {
			return request('/prebook/ticket-observe', ticket_query);
		},
		confirmTicket: function confirmTicket(ticket_query) {
			return request('/prebook/ticket-confirm', ticket_query);
		}
	};
})();