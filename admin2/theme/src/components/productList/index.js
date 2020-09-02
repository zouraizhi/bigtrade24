import React from 'react'
import { themeSettings, text } from '../../lib/settings'
import Item from './item'
import EmptyItem from './emptyItem'
import LoadMore from './loadMore'

const ProductList = ({
  products,
  addCartItem,
  settings,
  loadMoreProducts,
  hasMore,
  loadingProducts,
  loadingMoreProducts,
  isCentered,
}) => {

  var items = products ? products.map((product, index) => {
    return (
      <Item
        key={index}
        product={product}
        addCartItem={addCartItem}
        settings={settings}
      />
    )
  }) : null;

  if (items == null || items.length == 0) {
    items = [0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
      return <EmptyItem key={index} />
    })
  }

  return (
    <div>
      <div className="products">
          {items}
      </div>
      <div className="load-more">
        <LoadMore loadMoreProducts={loadMoreProducts} hasMore={hasMore} loading={loadingMoreProducts} />
      </div>
    </div>
  )
}

export default ProductList
