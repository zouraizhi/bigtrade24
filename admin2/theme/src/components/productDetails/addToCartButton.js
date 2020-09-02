import React from 'react'
import * as helper from '../../lib/helper'
import { themeSettings, text } from '../../lib/settings'

const AddToCartButton = ({ product, variant, addCartItem, isAllOptionsSelected, addingCartItem }) => {
  let buttonStyle = {};
  if(themeSettings.button_addtocart_bg && themeSettings.button_addtocart_bg.length > 0){
    buttonStyle.backgroundColor = themeSettings.button_addtocart_bg;
  }
  if(themeSettings.button_addtocart_color && themeSettings.button_addtocart_color.length > 0){
    buttonStyle.color = themeSettings.button_addtocart_color;
  }

  var addToCartText = themeSettings.button_addtocart_text && themeSettings.button_addtocart_text.length > 0 ? themeSettings.button_addtocart_text : text.addToCart;
  addToCartText = addingCartItem ? "Loading..." : addToCartText

  if(product.stock_status === 'discontinued') {
    return <a className="add-cart" style={buttonStyle} disabled>{text.discontinued}</a>
  } else if(product.variable && variant && variant.stock_quantity > 0) {
    return <a className="add-cart" style={buttonStyle} onClick={addCartItem} disabled={addingCartItem}>{addToCartText}</a>
  } else if(product.variable && !isAllOptionsSelected) {
    return <a className="add-cart" style={buttonStyle} disabled>{text.optionsRequired}</a>
  } else if(product.variable && !product.stock_backorder) {
    return <a className="add-cart" style={buttonStyle} disabled>{text.outOfStock}</a>
  } else if(product.stock_status === 'available') {
    return <a className="add-cart" style={buttonStyle} onClick={addCartItem} disabled={addingCartItem}>{addToCartText}</a>
  } else if(product.stock_status === 'out_of_stock') {
    return <a className="add-cart" style={buttonStyle} disabled>{text.outOfStock}</a>
  } else {
    return null;
  }
}

export default AddToCartButton;
