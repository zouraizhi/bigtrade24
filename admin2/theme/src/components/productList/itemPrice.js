import React from 'react'
import { themeSettings, text } from '../../lib/settings'
import * as helper from '../../lib/helper'

const FormattedCurrency = ({ number, settings }) => (helper.formatCurrency(number, settings))

const ItemPrice = ({ product, settings }) => {
  let priceStyle = {};
  if(themeSettings.list_price_size && themeSettings.list_price_size > 0){
    priceStyle.fontSize = themeSettings.list_price_size + 'px';
  }
  if(themeSettings.list_price_color && themeSettings.list_price_color.length > 0){
    priceStyle.color = themeSettings.list_price_color;
  }

  if(product.stock_status === 'discontinued') {
    return (
      <div className="price">
        {text.discontinued}
      </div>
    )
  } else if(product.stock_status === 'out_of_stock') {
    return (
      <div className="price">
        {text.outOfStock}
      </div>
    )
  } else if(product.on_sale) {
    return (
      <div className="price"><FormattedCurrency settings={settings} number={product.price} /> <span><FormattedCurrency settings={settings} number={product.regular_price} /></span></div>
    )
  } else {
    return (
      <div className="price"><FormattedCurrency settings={settings} number={product.price} /></div>
    )
  }
}

export default ItemPrice
