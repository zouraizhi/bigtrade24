import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

class StoreCheckout extends React.Component {
	render() {
		const {
			formSettings,
			shopSettings,
			onProgress,
			onCreateToken
		} = this.props;

		return (
			<Elements>
				<InjectedCheckoutForm
					ref="checkoutForm"
					formSettings={formSettings}
					shopSettings={shopSettings}
					onProgress={onProgress}
					onCreateToken={onCreateToken}
				/>
			</Elements>
		);
	}
}

export default StoreCheckout;
