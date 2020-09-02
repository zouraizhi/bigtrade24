import React from 'react';

export default class RazorpayPayment extends React.Component {
	showPayment = () => {
		const { formSettings, onPayment } = this.props;

		var options = {
			key: formSettings.key_id,
			amount: formSettings.amount * 100,
			handler: response => {
				onPayment(response.razorpay_payment_id);
			},
			theme: {
				color: '#F37254'
			}
		};
		var rzp1 = new Razorpay(options);
		rzp1.open();
	};

	render() {
		return <div />;
	}
}
