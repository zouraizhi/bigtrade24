import React from 'react'
import * as helper from '../../lib/helper'
import { themeSettings, text } from '../../lib/settings'

const FormattedCurrency = ({ number, settings }) => (helper.formatCurrency(number, settings))

const NewAndOldPrices = ({ newPrice, oldPrice, settings }) => (
  <h4>
    <FormattedCurrency settings={settings} number={newPrice} />
    <span style={{"margin-left":"5px","text-decoration":"line-through","color":"#a3a2a0"}}><FormattedCurrency settings={settings} number={oldPrice} /></span>
  </h4>
)

const Price = ({ product, variant, isAllOptionsSelected, settings }) => {
  let priceStyle = {};
  if(themeSettings.details_price_size && themeSettings.details_price_size > 0){
    priceStyle.fontSize = themeSettings.details_price_size + 'px';
  }
  if(themeSettings.details_price_color && themeSettings.details_price_color.length > 0){
    priceStyle.color = themeSettings.details_price_color;
  }

  let price = 0;
  let oldPrice = 0;

  if(product.variable && variant && variant.price > 0) {
    price = variant.price;
  } else {
    price = product.price;
  }

  if(product.on_sale) {
    oldPrice = product.regular_price;
  }

  if(oldPrice > 0) {
    return (
      <NewAndOldPrices settings={settings} newPrice={price} oldPrice={oldPrice} />
    )
  } else {
    return (
      <h4><FormattedCurrency settings={settings} number={price} /></h4>
    )
  }
}

export default Price;
