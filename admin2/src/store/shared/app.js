import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import IndexContainer from './containers/index';
import SharedContainer from './containers/shared';
import CategoryContainer from './containers/category';
import ProductContainer from './containers/product';
import PageContainer from './containers/page';
import CheckoutContainer from './containers/checkout';
import CheckoutSuccessContainer from './containers/checkoutSuccess';
import NotFoundContainer from './containers/notfound';
import SearchContainer from './containers/search';
import CartContainer from './containers/carts'
import AboutContainer from './containers/about'
import FaqContainer from './containers/faq'
import ContactContainer from './containers/contact'
import FavoriteContainer from './containers/favorite'

import { setCurrentPage } from './actions';
import { PAGE, PRODUCT_CATEGORY, PRODUCT, RESERVED, SEARCH } from './pageTypes';

class SwitchContainers extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		this.props.setCurrentPage(nextProps.location);

		if (nextProps.location && this.props.location) {
			const pathnameChanged =
				nextProps.location.pathname !== this.props.location.pathname;
			const queryChanged =
				nextProps.location.search !== this.props.location.search;
			const isSearchPage = nextProps.location.pathname === '/search';

			if (pathnameChanged || (queryChanged && isSearchPage)) {
				animateScroll.scrollToTop({
					duration: 500,
					delay: 100,
					smooth: true
				});
			}
		}
	}

	render() {
		const { history, location, currentPage } = this.props;
		const locationPathname =
			location && location.pathname ? location.pathname : '/';

		switch (currentPage.type) {
			case PRODUCT:
				return <ProductContainer />;
			case PRODUCT_CATEGORY:
				return <CategoryContainer />;
			case SEARCH:
				return <SearchContainer />;
			case PAGE:
				if(locationPathname === '/'){
					return <IndexContainer />;
				} else if(locationPathname === '/cart'){
					return <CartContainer />;
				} else if(locationPathname === '/checkout'){
					return <CheckoutContainer />;
				} else if(locationPathname === '/checkout-success'){
					return <CheckoutSuccessContainer />;
				} else if(locationPathname === '/about'){
					return <AboutContainer />;
				} else if(locationPathname === '/faq'){
					return <FaqContainer />;
				} else if(locationPathname === '/contact'){
					return <ContactContainer />;
				} else if(locationPathname === '/favorite'){
					return <FavoriteContainer />;
				} else {
					return <PageContainer />;
				}
			default:
				return <NotFoundContainer />;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		currentPage: state.app.currentPage
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setCurrentPage: location => {
			dispatch(setCurrentPage(location));
		}
	};
};

const SwitchContainersConnected = connect(
	mapStateToProps,
	mapDispatchToProps
)(SwitchContainers);

const App = () => (
	<SharedContainer>
		<Route component={SwitchContainersConnected} />
	</SharedContainer>
);

export default App;
