import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Form from './components/form';
import { pushNotification } from './actions';

const mapStateToProps = state => {
	return {
		type: state.notifications.type
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmit: values => {
			dispatch(pushNotification(values.title, values.body));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form);
