import React from 'react'
import { themeSettings, text } from '../../lib/settings'
import * as helper from '../../lib/helper'
import LazyLoad from 'react-lazyload'

const ItemImage = ({ images, productName, height }) => {
  if(images && images.length > 0) {
    const image = images[0];
    const imageUrl = helper.getThumbnailUrl(image.url, themeSettings.listThumbnailWidth);
    const alt = image.alt && image.alt.length > 0 ? image.alt : productName;

    return (
      <img src={imageUrl} className="img" alt={alt}/>
    )
  }
  return null
}

export default ItemImage
