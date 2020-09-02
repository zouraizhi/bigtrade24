import React from 'react'
import { NavLink } from 'react-router-dom'
import * as helper from '../../lib/helper'
import { themeSettings, text } from '../../lib/settings'
import Disqus from '../comments/disqus'
import ViewedProducts from '../products/viewed'

import Breadcrumbs from './breadcrumbs'
import DiscountCountdown from './discountCountdown'
import AddToCartButton from './addToCartButton'
import Attributes from './attributes'
import Gallery from './gallery'
import Options from './options'
import Price from './price'
import Quantity from './quantity'
import RelatedProducts from './relatedProducts'
import Tags from './tags'

const Fragment = React.Fragment;

const Description = ({ description }) => (
  <div dangerouslySetInnerHTML={{__html: description}} style={{"text-align":"center"}}/>
)

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: {},
      selectedVariant: null,
      isAllOptionsSelected: false,
      quantity: 1,
      showDescription: true,
      liked: false
    }

    this.onOptionChange = this.onOptionChange.bind(this);
    this.findVariantBySelectedOptions = this.findVariantBySelectedOptions.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.checkSelectedOptions = this.checkSelectedOptions.bind(this);
  }

  componentDidMount(){
    this.setState({liked: this.isLikedProduct(this.props.product)})
  }

  onOptionChange(optionId, valueId) {
    let {selectedOptions} = this.state;

    if(valueId === '') {
      delete selectedOptions[optionId];
    } else {
      selectedOptions[optionId] = valueId;
    }

    this.setState({ selectedOptions: selectedOptions });
    this.findVariantBySelectedOptions();
    this.checkSelectedOptions();
  }

  findVariantBySelectedOptions() {
    const {selectedOptions} = this.state;
    const {product} = this.props;
    for(const variant of product.variants) {
      const variantMutchSelectedOptions = variant.options.every(variantOption => selectedOptions[variantOption.option_id] === variantOption.value_id);
      if(variantMutchSelectedOptions) {
        this.setState({ selectedVariant: variant });
        return;
      }
    }

    this.setState({ selectedVariant: null });
  }

  setQuantity = (quantity) => {
    this.setState({ quantity: quantity });
  }

  addToCart() {
    const {product, addCartItem} = this.props;
    const {selectedVariant, quantity} = this.state;

    let item = {
      product_id: product.id,
      quantity: quantity
    }

    if(selectedVariant) {
      item.variant_id = selectedVariant.id;
    }

    addCartItem(item);
  }

  checkSelectedOptions() {
    const {selectedOptions} = this.state;
    const {product} = this.props;

    const allOptionsSelected = Object.keys(selectedOptions).length === product.options.length;
    this.setState({ isAllOptionsSelected: allOptionsSelected });
  }

  render() {
    const {product, settings, categories, addingCartItem} = this.props;
    const {selectedVariant, isAllOptionsSelected} = this.state;
    const maxQuantity = product.stock_status === 'discontinued' ?
      0 :
      product.stock_backorder ?
        themeSettings.maxCartItemQty :
        (selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity);

    if(product){
      return (
        <div>
          <section id="product-detail">
            <div className="container">
              <div className="gallery">
                <Gallery images={product.images} />
              </div>

              <div className="product-info">
                <h2>{product.name}</h2>
                <Price product={product} variant={selectedVariant} isAllOptionsSelected={isAllOptionsSelected} settings={settings} />

                <Options options={product.options} onChange={this.onOptionChange} />

                <div className="btn-wrap">
                  <AddToCartButton product={product} variant={selectedVariant} addCartItem={this.addToCart} isAllOptionsSelected={isAllOptionsSelected} addingCartItem={addingCartItem}/>
                  <a className="add-favorite" onClick={this.likeProduct}><img alt="img" src={this.state.liked ? "/assets/images/cestore/ic_favorited.svg" : "/assets/images/cestore/ic_favorite.svg"}/><span>Add To Favorites</span></a>
                </div>
                {/*
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  */}
              </div>

            </div>
          </section>
          <section id="product-content">
            <div className="container">
              <nav className="tab">
                <ul>
                  <li><a className={this.state.showDescription ? "active" : ""} onClick={()=>this.setState({showDescription:true})}>Description</a></li>
                  <li><a className={!this.state.showDescription ? "active" : ""} onClick={()=>this.setState({showDescription:false})}>Details</a></li>
                </ul>
              </nav>
              {this.state.showDescription && <Description description={product.description} />}
              {!this.state.showDescription && <Attributes attributes={product.attributes} />}
            </div>

          </section>

          <RelatedProducts
            settings={settings}
            addCartItem={this.addToCart}
            ids={product.related_product_ids}
            limit={10}
          />

          {themeSettings.show_viewed_products &&
            <ViewedProducts
              settings={settings}
              addCartItem={this.addToCart}
              product={product}
              limit={themeSettings.limit_viewed_products || 4}
            />
          }

          {themeSettings.disqus_shortname && themeSettings.disqus_shortname !== '' &&
            <section id="comments">
              <div className="container">
                <Disqus
                  shortname={themeSettings.disqus_shortname}
                  identifier={product.id}
                  title={product.name}
                  url={product.url}
                />
              </div>
            </section>
          }

          <section id="subscribe">
              <div className="container">
                <h2>Subscribe and Get 15% Off</h2>
                <form>
                    <input type="text" placeholder="Your email"/>
                    <a><img src="/assets/images/cestore/ic_send_mail.svg" alt="img"/></a>
                </form>
              </div>
          </section>
        </div>
      )

      return (
        <Fragment>
          <section className="section section-product">
            <div className="container">
              <div className="columns">
                <div className="column is-7">
                  {themeSettings.show_product_breadcrumbs &&
                    <Breadcrumbs product={product} categories={categories} />
                  }
                  <Gallery images={product.images} />
                </div>
                <div className="column is-5">
                  <div className="content">
                    <Tags tags={product.tags} />
                    <h1 className="title is-4 product-name">{product.name}</h1>
                    <Price product={product} variant={selectedVariant} isAllOptionsSelected={isAllOptionsSelected} settings={settings} />

                    {themeSettings.show_discount_countdown && product.on_sale === true &&
                      <DiscountCountdown product={product} />
                    }

                    <Options options={product.options} onChange={this.onOptionChange} />
                    <Quantity maxQuantity={maxQuantity} onChange={this.setQuantity} />
                    <div className="button-addtocart">
                      <AddToCartButton product={product} variant={selectedVariant} addCartItem={this.addToCart} isAllOptionsSelected={isAllOptionsSelected} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>


          <section className="section section-product-description">
            <div className="container">
              <div className="content">
                <div className="columns">
                  <div className="column is-7">
                    <Description description={product.description} />
                  </div>
                  <div className="column is-5">
                    <Attributes attributes={product.attributes} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RelatedProducts
            settings={settings}
            addCartItem={this.addToCart}
            ids={product.related_product_ids}
            limit={10}
          />

          {themeSettings.show_viewed_products &&
            <ViewedProducts
              settings={settings}
              addCartItem={this.addToCart}
              product={product}
              limit={themeSettings.limit_viewed_products || 4}
            />
          }

          {themeSettings.disqus_shortname && themeSettings.disqus_shortname !== '' &&
            <section className="section">
              <div className="container">
                <Disqus
                  shortname={themeSettings.disqus_shortname}
                  identifier={product.id}
                  title={product.name}
                  url={product.url}
                />
              </div>
            </section>
          }
        </Fragment>
      )
    } else {
      return null;
    }
  }

  isLikedProduct = (product)=>{
    var products = localStorage.getItem("liked_products");
    var existed = false
    if (products) {
      products = JSON.parse(products)

      products.forEach((item, i)=>{
        if (product.id == item.id) {
          existed = true
          return
        }
      })
      return existed
    }

    return existed
  }

  likeProduct = ()=>{
    let {product} = this.props
    var products = localStorage.getItem("liked_products");
    var existed = false

    if (products) {
      products = JSON.parse(products)

      var index = -1
      products.forEach((item, i)=>{
        if (product.id == item.id) {
          existed = true
          index = i
          return
        }
      })

      if (existed) {
        products.splice(index,1)
      }else{
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.images.length > 1 ? product.images[0].url : ""
        })
      }
    }else{
      products=[{
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.images.length > 1 ? product.images[0].url : ""
      }]
    }

    localStorage.setItem("liked_products",JSON.stringify(products));
    this.setState({liked: !existed})
  }
}
