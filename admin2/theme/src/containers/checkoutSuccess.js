import React from 'react'
import { themeSettings, text } from '../lib/settings'
import * as helper from '../lib/helper'
import MetaTags from '../components/metaTags'
import CheckoutSuccess from '../components/checkoutSuccess'
const Fragment = React.Fragment;
import { NavLink } from 'react-router-dom'

const CheckoutSuccessContainer = (props) => {
  const {pageDetails, order, settings, shippingMethods, checkoutFields} = props.state;
  const shippingMethod = helper.getShippingMethodFromOrder(order, shippingMethods);

  return (
    <div>
      <MetaTags
        title={pageDetails.meta_title}
        description={pageDetails.meta_description}
        canonicalUrl={pageDetails.url}
        ogTitle={pageDetails.meta_title}
        ogDescription={pageDetails.meta_description}
      />

      <section id="order-confirm">
          <div className="container">
            <div className="item">
              <img src='/assets/images/cestore/order_received.png' alt="img"/>
              <div className="wrapper">
                <h1>Thanks!</h1>
                <h1>Your order is complete</h1>
                <p>We sent a confirmation to your email</p>
              </div>
              <NavLink to="/">Home Page</NavLink>
            </div>

          </div>
      </section>
    </div>
  )
}

export default CheckoutSuccessContainer
