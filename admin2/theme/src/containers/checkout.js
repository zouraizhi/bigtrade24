import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import OrderSummary from '../components/orderSummary';
const Fragment = React.Fragment;
import HeadBox from '../components/headBox';
import Countries from '../lib/countries.js';
import * as helper from '../lib/helper';
import PaymentForm from '../components/paymentForm';
import _ from 'lodash';

class CheckoutContainer extends React.Component {
	state = {
		email: '',
		phone: '',
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		country: '',
		postalCode: '',
		selectedPayment: 0,
		check: false,
		doingPayment: false,
		inValidInfo: false
	};

	render() {
		let {
			email,
			phone,
			firstName,
			lastName,
			address,
			city,
			country,
			postalCode,
			check,
			doingPayment,
			isValidInfo
		} = this.state;

		let {
			paymentMethods,
			shippingMethods,
			pageDetails,
			settings,
			cart,
			processingCheckout
		} = this.props.state;

		const { payment_method_gateway, grand_total } = cart ? cart : {};
		var isShowPaymentForm = false;
		if (payment_method_gateway && payment_method_gateway != '') {
			if (payment_method_gateway == 'paypal-checkout') {
				isShowPaymentForm = isValidInfo;
			} else {
				isShowPaymentForm = true;
			}
		}

		return (
			<div>
				<MetaTags
					title={pageDetails.meta_title}
					description={pageDetails.meta_description}
					canonicalUrl={pageDetails.url}
					ogTitle={pageDetails.meta_title}
					ogDescription={pageDetails.meta_description}
				/>
				<HeadBox title="Checkout" backgroundColor="#FCE9E9" />
				{cart != null && (
					<section id="checkout">
						<div className="container">
							<div className="form">
								<form>
									<div className="input-checkout">
										<label>E-mail*</label>
										<input
											type="text"
											value={email}
											onChange={event =>
												this.setState({ email: event.target.value })
											}
										/>
										{check && email == '' && <span>Please enter email</span>}
									</div>
									<div className="input-checkout">
										<label>Phone*</label>
										<input
											type="text"
											value={phone}
											onChange={event =>
												this.setState({ phone: event.target.value })
											}
										/>
										{check && phone == '' && <span>Please enter phone</span>}
									</div>
									<h4>Shipping Address</h4>
									<div className="input-checkout">
										<label>First name*</label>
										<input
											type="text"
											value={firstName}
											onChange={event =>
												this.setState({ firstName: event.target.value })
											}
										/>
										{check && firstName == '' && (
											<span>Please enter first name</span>
										)}
									</div>
									<div className="input-checkout">
										<label>Last name*</label>
										<input
											type="text"
											value={lastName}
											onChange={event =>
												this.setState({ lastName: event.target.value })
											}
										/>
										{check && lastName == '' && (
											<span>Please enter last name</span>
										)}
									</div>
									<div className="input-checkout">
										<label>Address*</label>
										<input
											type="text"
											value={address}
											onChange={event =>
												this.setState({ address: event.target.value })
											}
										/>
										{check && address == '' && (
											<span>Please enter address</span>
										)}
									</div>
									<div className="input-checkout">
										<label>City*</label>
										<input
											type="text"
											value={city}
											onChange={event =>
												this.setState({ city: event.target.value })
											}
										/>
										{check && city == '' && <span>Please enter city</span>}
									</div>
									<div className="input-checkout">
										<label>Country*</label>
										<div className="select-input">
											<div className="dropdown">
												<select
													value={country}
													onChange={event =>
														this.setState({ country: event.target.value })
													}
												>
													{Countries.map((item, index) => (
														<option key={index} value={item.countryName}>
															{item.countryName}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
									<div className="input-checkout">
										<label>Postal code*</label>
										<input
											type="text"
											value={postalCode}
											onChange={event =>
												this.setState({ postalCode: event.target.value })
											}
										/>
										{check && postalCode == '' && (
											<span>Please enter postal code</span>
										)}
									</div>
									<h4>Payment method</h4>
									{paymentMethods.map((item, index) =>
										this.renderPaymentItem(item, index)
									)}
									{isShowPaymentForm && (
										<PaymentForm
											ref="paymentForm"
											gateway={payment_method_gateway}
											amount={grand_total}
											shopSettings={settings}
											onProgress={this.onProgressStripe}
											onCreateToken={this.handleCheckoutWithToken}
											onPayment={this.onPayment}
										/>
									)}
									{(payment_method_gateway != 'paypal-checkout' ||
										!isValidInfo ||
										doingPayment ||
										processingCheckout) && (
										<div
											className="input-checkout right"
											style={{
												marginTop: paymentMethods.length > 1 ? '20px' : '0'
											}}
										>
											<a
												className="btn-checkout"
												onClick={this.makePayment}
												disabled={doingPayment || processingCheckout}
											>
												{doingPayment || processingCheckout
													? 'Loading...'
													: 'Proceed To Payment'}
											</a>
										</div>
									)}
								</form>
							</div>

							<div className="your-order">
								<h4 id="header">Your order</h4>
								{cart.items.map(item => this.renderCartItem(item))}

								<div id="summany">
									<div id="item-wrap">
										<div className="item">
											<span>Delivery</span>
											<span>{`$${cart.shipping_price} (${
												cart.shipping_method
											})`}</span>
										</div>
										{/*
                      <div className="item">
                        <span>Discount</span>
                        <span>-$20</span>
                      </div>
                      */}
									</div>
									<div id="total">
										<span>Total</span>
										<span>
											{helper.formatCurrency(cart.grand_total, settings)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}

	renderCartItem = item => {
		let { settings } = this.props.state;
		const thumbnail = helper.getThumbnailUrl(
			item.image_url,
			themeSettings.cartThumbnailWidth
		);

		return (
			<div className="cart-item-product your-order-item">
				<img src={thumbnail} alt="img" />
				<div className="cart-item-product-info">
					<h4>{item.name}</h4>
					{item.variant_name.length > 0 && (
						<div>
							<span>{item.variant_name}</span>
						</div>
					)}
					<div>{helper.formatCurrency(item.price, settings)}</div>
				</div>
			</div>
		);
	};

	renderPaymentItem = (item, index) => {
		let { cart } = this.props.state;

		return (
			<div className="input-checkout">
				<div
					className="radio-input"
					onClick={() => this.onChangePayment(item, index)}
				>
					<img
						alt="img"
						src={
							this.state.selectedPayment == index
								? '/assets/images/cestore/ic_selected_radio.svg'
								: '/assets/images/cestore/ic_radio.svg'
						}
					/>
					<label>{item.name}</label>
				</div>
			</div>
		);
	};

	validateForm = () => {
		let {
			email,
			phone,
			firstName,
			lastName,
			address,
			city,
			country,
			postalCode
		} = this.state;

		this.setState({ check: true });
		if (
			email == '' ||
			phone == '' ||
			firstName == '' ||
			lastName == '' ||
			address == '' ||
			city == '' ||
			country == '' ||
			postalCode == '' ||
			this.props.state.processingCheckout
		) {
			return false;
		}

		return true;
	};

	checkout = () => {
		let {
			email,
			phone,
			firstName,
			lastName,
			address,
			city,
			country,
			postalCode
		} = this.state;

		if (!this.validateForm()) {
			return;
		}

		var cart = this.props.state.cart;
		cart.shipping_address = {
			full_name: firstName + ' ' + lastName,
			address,
			city,
			country,
			postalCode
		};
		cart.billing_address = cart.shipping_address;
		(cart.email = email), (cart.phone = phone);

		let selectedPayment = this.state.selectedPayment;
		if (this.props.paymentMethods && this.props.paymentMethods.length > 0) {
			let payment = this.props.paymentMethods[selectedPayment];
			cart.payment_method_id = payment.id;
		}
		this.props.checkout(cart);
	};

	onChangePayment = (item, index) => {
		if (item.gateway == 'paypal-checkout') {
			const isValidInfo = this.validateForm();
			this.setState({ isValidInfo });
			if (isValidInfo) {
				this.props.savePaymentMethod(item.id);
				this.setState({ selectedPayment: index });
			}
		} else {
			this.props.savePaymentMethod(item.id);
			this.setState({ selectedPayment: index });
		}
	};

	makePayment = () => {
		const { payment_method_gateway } = this.props.state.cart;
		if (!payment_method_gateway || payment_method_gateway == '') {
			return this.checkout();
		}

		if (this.validateForm()) {
			if (payment_method_gateway == 'stripe-elements') {
				this.refs.paymentForm.refs.stripElements.refs.storeCheckout.refs.checkoutForm.wrappedInstance.submitForm();
			}
			if (payment_method_gateway == 'razorpay-checkout') {
				this.refs.paymentForm.refs.razorpayCheckout.showPayment();
			}
		}
	};

	onProgressStripe = doingPayment => {
		this.setState({ doingPayment });
	};

	handleCheckoutWithToken = tokenId => {
		this.props.updateCart({ payment_token: tokenId }, () => {
			this.checkout();
		});
	};

	onPayment = () => {
		this.props.updateCart({ paid: true }, () => {
			this.checkout();
		});
	};

	componentDidMount() {
		if (
			this.props.paymentMethods == undefined ||
			this.props.paymentMethods.length == 0
		) {
			//get shippingMethods, paymentMethods
			this.props.onLoad();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.state.paymentMethods &&
			nextProps.state.paymentMethods.length > 0 &&
			this.state.selectedPayment == 0
		) {
			const { cart } = this.props.state;

			var paymentIndex = -1;
			if (cart && cart.payment_method_id) {
				paymentIndex = _.findIndex(
					nextProps.state.paymentMethods,
					o => o.id == cart.payment_method_id
				);
			}

			if (paymentIndex > 0) {
				this.setState({ selectedPayment: paymentIndex });
			}
		}
	}
}

export default CheckoutContainer;
