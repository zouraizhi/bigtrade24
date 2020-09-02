const getPaymentFormSettings = options => {
	const { gateway, gatewaySettings, order, amount, currency } = options;

	const formSettings = {
		order_id: order.id,
		amount: amount,
		currency: currency,
		key_id: gatewaySettings.key_id,
		key_secret: gatewaySettings.key_secret
	};

	return Promise.resolve(formSettings);
};

export default {
	getPaymentFormSettings: getPaymentFormSettings
};
