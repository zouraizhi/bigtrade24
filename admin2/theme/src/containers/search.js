import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import ProductList from '../components/productList'
const Fragment = React.Fragment;

const CategoryContainer = (props) => {
  const {products, settings, productFilter, productsHasMore, productsMinPrice, productsMaxPrice, productsTotalCount} = props.state;
  const {setSearch, setSort, setPriceFromAndTo, addCartItem, loadMoreProducts} = props;
  const searchNotEmpty = productFilter.search && productFilter.search !== '';
  const searchDescription = searchNotEmpty ? `${text.resultsFor} "${productFilter.search}"` : text.search;
  const title = searchNotEmpty ? `${productFilter.search} - ${text.search}` : text.search;

  return (
    <div>
      <MetaTags
        title={title}
      />

      <section className="hero is-light">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-4">{searchDescription}</h1>
          </div>
        </div>
      </section>

      <section id="featured-products">
        <div className="container">
          <ProductList
            products={products}
            addCartItem={addCartItem}
            settings={settings}
            loadMoreProducts={loadMoreProducts}
            hasMore={productsHasMore}
          />
        </div>
      </section>
    </div>
  )
}

export default CategoryContainer
