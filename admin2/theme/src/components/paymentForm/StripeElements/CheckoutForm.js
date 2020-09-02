import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
	submitForm = async ev => {
		const { formSettings, onCreateToken, stripe, onProgress } = this.props;
		onProgress(true);
		const { token } = await stripe.createToken({
			name: formSettings.email
		});
		if (token && token !== 'undefined') {
			onCreateToken(token.id);
		} else {
			onProgress(false);
		}
	};

	render() {
		return <CardSection title="Credit Card details" />;
	}
}
export default injectStripe(CheckoutForm, { withRef: true });
