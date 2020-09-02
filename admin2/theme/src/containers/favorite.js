import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import HeadBox from '../components/headBox'
import * as helper from '../lib/helper'
import Subscribe from '../components/subscribe'

class FavoriteContainer extends React.Component {
  state = {
    products:[]
  }

  render() {
    let {pageDetails, settings} = this.props.state

    return (
      <div>
        <MetaTags
          title={pageDetails.meta_title}
          description={pageDetails.meta_description}
          canonicalUrl={pageDetails.url}
          ogTitle={pageDetails.meta_title}
          ogDescription={pageDetails.meta_description}
        />
        <HeadBox title="Favorites" backgroundColor="#DCC3DF"/>

        <section id="carts">
          <div className="container">
            <table>
              <tr>
                <th id="product">Product</th>
                <th id="price">Price</th>
                <th id="checkout-button"></th>
                <th id="remove"></th>
              </tr>
              {this.renderItems()}

            </table>
          </div>
        </section>

        {this.state.products.length > 0 && (
          <section>
            <div className="container">
              <div className="total-wrap">
                <a className="btn-checkout" onClick={this.addAllToCart}>Add All to Cart</a>
              </div>
            </div>
          </section>
        )}

      </div>
    )
  }

  renderItems = ()=>{
    var items = []

    this.state.products.forEach((item,index)=>{
      items.push(
        <tr>
          <td className="cart-item-product">
            <img src={item.image_url} alt="img"/>
            <div className="cart-item-product-info">
              <h4>{item.name}</h4>
              {/*
                <div>
                  <span>size <span className="attribute">XL</span></span>
                  <span>color <span className="attribute">blue</span></span>
                </div>
                */}
            </div>
          </td>
          <td>${item.price}</td>
          <td>
            <div className="favorite-btn-checkout" onClick={()=>this.addCartItem(item,index)}>
              <img src="/assets/images/cestore/ic_cart.svg" alt="img"/>
              <p>Checkout</p>
            </div>
          </td>
          <td className="cart-item-remove"><a onClick={()=>this.removeItem(index)}><img src="/assets/images/cestore/ic_remove.svg" alt="img"/></a></td>
        </tr>
      )
    })

    return items
  }

  addCartItem = (product, index)=>{
    let item = {
      product_id: product.id,
      quantity: 1
    }

    this.props.addCartItem(item);

    //remove from favorite
    var products = localStorage.getItem("liked_products");
    products = JSON.parse(products)
    products.splice(index,1)
    this.setState({products})
    localStorage.setItem("liked_products",JSON.stringify(products));
  }

  removeItem = (index)=>{
    var products = localStorage.getItem("liked_products");
    products = JSON.parse(products)
    products.splice(index,1)
    this.setState({products})
    localStorage.setItem("liked_products",JSON.stringify(products));
  }

  addAllToCart = ()=>{
    this.state.products.forEach((product)=>{
      let item = {
        product_id: product.id,
        quantity: 1
      }

      this.props.addCartItem(item);
    })

    //remove all from favorite
    this.setState({products: []})
    localStorage.setItem("liked_products",JSON.stringify([]));
  }

  componentDidMount(){
    var products = localStorage.getItem("liked_products");
    var items = []
    if (products) {
      products = JSON.parse(products)
      this.setState({products})
    }
  }
}

export default FavoriteContainer
