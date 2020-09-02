/** @format */

import settings from 'lib/settings';
const dashboardToken = localStorage.getItem('dashboard_token');
import axios from 'axios';

class ApiClient {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this.token = dashboardToken;
	}

	post(endpoint, params) {
		return this.requestHttp('POST', this.baseUrl + endpoint, params);
	}

	get(endpoint) {
		return this.requestHttp('GET', this.baseUrl + endpoint, null);
	}

	put(endpoint, params) {
		return this.requestHttp('PUT', this.baseUrl + endpoint, params);
	}

	delete(endpoint, params) {
		return this.requestHttp('DELETE', this.baseUrl + endpoint, params);
	}

	requestHttp(method, url, params) {
		return new Promise((resolve, reject) => {
			const options = {
				method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.token}`
				}
			};

			if (params) {
				options.body = JSON.stringify(params);
			}

			fetch(url, options)
				.then(response => {
					response
						.json()
						.then(body => {
							resolve({ statusCode: response.status, body });
						})
						.catch(error => {
							reject('Can not connect to server.');
						});
				})
				.catch(error => {
					reject('Can not connect to server.');
				});
		});
	}

	uploadFile(endpoint, formData, params, onProgress) {
		return new Promise((resolve, reject) => {
			var url = this.baseUrl + endpoint;
			for (var k in params) {
				formData.append(k, params[k]);
			}
			axios
				.post(url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: 'Bearer ' + this.token
					},
					onUploadProgress: function(progressEvent) {
						var percentCompleted = progressEvent.loaded / progressEvent.total;
						console.log(percentCompleted);
						onProgress(percentCompleted);
					}
				})
				.then(responseJson => {
					reject(responseJson);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
}

const api = new ApiClient({
	baseUrl: settings.apiBaseUrl || '/api/v1'
});

export default api;
