import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import NavigationDefault from '../navigation/NavigationDefault';
import HeaderActions from './modules/HeaderActions';
import MenuCategories from './modules/MenuCategories';
import { addItem } from '../../../store/cart/action';
import { stickyHeader } from '../../../utilities/common-helpers';
import { isStaticData } from '../../../utilities/app-settings';
import { baseUrl } from '../../../repositories/Repository';
import SearchHeader from './modules/SearchHeader';
import menuData from '../../../public/static/data/menu';
import Menu from '../../elements/menu/Menu';
import ElectronicHeaderActions from './modules/ElectronicHeaderActions';

class HeaderProduct extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }

    handleAddItemToCart = (e) => {
        e.preventDefault();
        const { productData } = this.props;
        this.props.dispatch(addItem(productData));
    };

    handleScroll = () => {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        if (number >= 300) {
            document
                .getElementById('headerSticky')
                .classList.add('header--sticky');
        } else {
            document
                .getElementById('headerSticky')
                .classList.remove('header--sticky');
        }
    };

    render() {
        const { productData } = this.props;
        const { singleProduct } = this.props;
        return (
            <header className="header header--market-place-3" id="headerSticky">
                <div style={{ backgroundColor: '#157ED2', borderBottomColor:'#157ED2' }} className="header__top">
                    <div className="container">
                        <div className="header__left">
                            <div className="menu--product-categories">
                                <div className="menu__toggle">
                                    <i style={{color:'white'}} className="icon-menu"></i>
                                    <span style={{color:'white'}}> Categories</span>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        data={menuData.product_categories}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                      

                        </div>
                        <div className="header__center">

                            <Link href="#">
                                <a style={{ marginLeft: 200 }} className="ps-logo">
                                    <img
                                        src="/static/img/logo_light.png"
                                        alt="martfury"
                                    />
                                </a>
                            </Link>

                        </div>
                        <div className="header__right">

                            <div style={{ marginTop:5, width: '40%', flexDirection: 'row' }}>
                                <i style={{ color: 'white', fontSize: 16, marginRight: 5 }} className="icon-envelope"></i>
                                <span style={{ color: 'white', fontSize: 14, }}>support@Junkiri.com</span>

                            </div>

                        </div>
                    </div>
                </div>

                <nav style={{ backgroundColor: '#157ED2' }} className="navigation">
                    <div className="container">
                        <div className="navigation__left">
                            <div style={{ backgroundColor: '#20488A', borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingLeft: 10, paddingTop: 15 }} className="menu--product-categories">
                                <div>
                                    <i style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} className="icon-menu"></i>
                                    <span style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}> Categories</span>
                                </div>
                                <div className="menu__content">
                                    <Menu
                                        data={menuData.product_categories}
                                        className="menu--dropdown"
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingTop: 5, paddingBottom: 5 }} className="navigation__right">
                            <div className="header__center">
                                <SearchHeader />
                            </div>
                            {/* <ul className="menu menu--recent-view">
                                <li className="menu-item-has-children">
                                    <Link href="/page/blank">
                                        <a>Your Recently Viewed</a>
                                    </Link>
                                    <div className="navigation__recent-products">
                                        <p>
                                            <Link href="/page/blank">
                                                <a>
                                                    See all your recently viewed
                                                    items
                                                </a>
                                            </Link>
                                        </p>
                                    </div>
                                </li>
                            </ul> */}
                            <div className="navigation__extra">
                                <ElectronicHeaderActions />
                            </div>
                            {/* <ul className="navigation__extra">
                                <li>
                                    <Link href="/vendor/become-a-vendor">
                                        <a>Sell on Martfury</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/order-tracking">
                                        <a>Tract your order</a>
                                    </Link>
                                </li>
                                <li>
                                    <CurrencyDropdown />
                                </li>
                                <li>
                                    <LanguageSwicher />
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}
export default connect((state) => state.product)(HeaderProduct);
