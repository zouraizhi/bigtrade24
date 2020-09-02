import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';
import style from './style.css';

import Paper from 'material-ui/Paper';
import * as t from '../actionTypes';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
	const errors = {};
	const requiredFields = ['title', 'body'];

	requiredFields.forEach(field => {
		if (values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});

	return errors;
};

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {
			handleSubmit,
			pristine,
			submitting,
			isSaving,
			initialValues,
			type
		} = this.props;

		let statusId = null;

		if (initialValues) {
			statusId = initialValues.id;
		}

		return (
			<Paper className="paper-box" zDepth={1}>
				<form onSubmit={handleSubmit}>
					<div className={style.innerBox}>
						{type == t.PUSH_NOTIFICATION_SUCCESS && (
							<div className={style.message}>
								The notification is sent to all devices.
							</div>
						)}
						<Field
							name="title"
							component={TextField}
							floatingLabelText={messages.title + ' *'}
							fullWidth={true}
						/>
						<br />
						<Field
							name="body"
							component={TextField}
							floatingLabelText={messages.body + ' *'}
							fullWidth={true}
							multiLine={true}
							rows={1}
						/>
					</div>
					<div className="buttons-box">
						<RaisedButton
							type="submit"
							label={messages.submit}
							primary={true}
							className={style.button}
							disabled={pristine || submitting || isSaving}
						/>
					</div>
				</form>
			</Paper>
		);
	}
}

export default reduxForm({
	form: 'PushNotificationForm',
	validate,
	enableReinitialize: true
})(Form);
