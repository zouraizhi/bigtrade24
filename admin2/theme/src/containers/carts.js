import React from 'react';
import { themeSettings, text } from '../lib/settings';
import MetaTags from '../components/metaTags';
import HeadBox from '../components/headBox';
import * as helper from '../lib/helper';
import { NavLink } from 'react-router-dom';

const Fragment = React.Fragment;

const CartItem = ({
	item,
	deleteCartItem,
	updateCartItemQuantiry,
	settings
}) => {
	const thumbnail = helper.getThumbnailUrl(
		item.image_url,
		themeSettings.cartThumbnailWidth
	);
	const onChangeQuantity = event => {
		let quantity = event.target.value;
		updateCartItemQuantiry(item.id, quantity);
	};

	return (
		<tr>
			<td className="cart-item-product">
				<img src={thumbnail} alt="img" />
				<div className="cart-item-product-info">
					<h4>{item.name}</h4>
					{item.variant_name.length > 0 && (
						<div>
							<span>{item.variant_name}</span>
						</div>
					)}
				</div>
			</td>
			<td>{helper.formatCurrency(item.price, settings)}</td>
			<td>
				<select value={item.quantity} onChange={onChangeQuantity}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
			</td>
			<td style={{ 'font-weight': 'bold' }}>
				{helper.formatCurrency(item.price_total, settings)}
			</td>
			<td className="cart-item-remove">
				<a onClick={() => deleteCartItem(item.id)}>
					<img src="/assets/images/cestore/ic_remove.svg" alt="img" />
				</a>
			</td>
		</tr>
	);
};

class CartContainer extends React.Component {
	render() {
		let { deleteCartItem, updateCartItemQuantiry } = this.props;
		const { pageDetails, cart, settings, shippingMethods } = this.props.state;

		var items = [];
		if (cart && cart.items && cart.items.length > 0) {
			items = cart.items.map(item => (
				<CartItem
					key={item.id}
					item={item}
					deleteCartItem={deleteCartItem}
					updateCartItemQuantiry={updateCartItemQuantiry}
					settings={settings}
				/>
			));
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

				<HeadBox title="Shopping Cart" backgroundColor="#C3DFC9" />

				<section id="carts">
					<div className="container">
						<table>
							<tr>
								<th id="product">Product</th>
								<th id="price">Price</th>
								<th id="quantity">Quantity</th>
								<th id="total">Total</th>
								<th id="remove" />
							</tr>
							{items}
						</table>
					</div>
				</section>

				{cart && (
					<section id="discount-shipping">
						<div className="container">
							{/*
                <div className="discount-wrap">
                  <h4>Do you have a discount?</h4>
                  <form>
                      <input type="text" placeholder="Coupon code"/>
                      <a><img src="/assets/images/cestore/ic_send_mail.svg" /></a>
                  </form>
                </div>
                */}

							<div className="shipping-wrap">
								<h4>Shipping</h4>
								<div className="select-wrap">
									<div className="dropdown">
										<select
											onChange={this.onChangeShipping}
											value={cart.shipping_method_id}
										>
											{shippingMethods.map(item => (
												<option value={item.id}>{item.name}</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}

				{cart && (
					<section>
						<div className="container">
							<div className="total-wrap">
								<div className="discount">
									<h4>Delivery</h4>
									<span>${cart.shipping_price}</span>
								</div>
								{/*
                  <div className="discount">
                    <h4>Discount</h4>
                    <span>-$10</span>
                  </div>
                  */}
								<div className="total">
									<h4>Total</h4>
									<span>
										{helper.formatCurrency(cart.grand_total, settings)}
									</span>
								</div>

								<a className="btn-checkout" onClick={this.checkout}>
									Proceed To Checkout
								</a>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}

	onChangeShipping = event => {
		let shippingId = event.target.value;
		this.props.saveShippingMethod(shippingId);
	};

	checkout = () => {
		const { cart, shippingMethods } = this.props.state;
		if (
			cart.shipping_method_id == '' ||
			cart.shipping_method_id == null ||
			cart.shipping_method_id == undefined
		) {
			if (shippingMethods.length > 0) {
				let shippingId = shippingMethods[0].id;
				this.props.saveShippingMethod(shippingId);
			}
		}
		this.props.history.push('/checkout');
	};

	componentDidMount() {
		//get shippingMethods, paymentMethods
		this.props.onLoad();
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.state.shippingMethods &&
			nextProps.state.shippingMethods.length > 0 &&
			nextProps.state.cart &&
			(!nextProps.state.cart.shipping_method_id ||
				nextProps.state.cart.shipping_method_id == '')
		) {
			this.props.saveShippingMethod(nextProps.state.shippingMethods[0].id);
		}
	}
}

export default CartContainer;
