import * as t from './actionTypes';
import api from 'lib/api';
import messages from 'lib/text';
import apiClient from 'lib/apiClient';

export function pushNotification(title, body) {
	return (dispatch, getState) => {
		dispatch({ type: t.PUSH_NOTIFICATION_PENDING });
		apiClient
			.post('/push-notification', { title, body })
			.then(res => {
				dispatch({ type: t.PUSH_NOTIFICATION_SUCCESS });
			})
			.catch(error => {
				dispatch({ type: t.PUSH_NOTIFICATION_FAILURE });
			});
	};
}
