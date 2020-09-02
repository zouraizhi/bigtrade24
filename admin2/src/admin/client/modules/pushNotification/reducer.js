import * as t from './actionTypes';

const initialState = {
	isFetching: false,
	message: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.PUSH_NOTIFICATION_PENDING:
			return Object.assign({}, state, {
				isFetching: true,
				message: '',
				type: action.type
			});
		case t.PUSH_NOTIFICATION_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				message: action.message,
				type: action.type
			});
		case t.PUSH_NOTIFICATION_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				type: action.type
			});
		default:
			return state;
	}
};
