import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import ProductList from '../components/productList'
import ProductFilter from '../components/productFilter'
import Sort from '../components/sort'
import CategoryBreadcrumbs from '../components/categoryBreadcrumbs'
import * as helper from '../lib/helper'
const Fragment = React.Fragment;
import HeadBox from '../components/headBox'
import Subscribe from '../components/subscribe'

var filter = {}

const Attributes = ({attribute, setFilterAttribute}) => (
  <div className="filter-item">
    <h4>{attribute.name}</h4>
    <div className="dropdown">
      <select onChange={(event)=>setFilterAttribute(attribute.name, event.target.value)} aria-label={attribute.name}>
        {attribute.values.map((item)=><option value={item.name}>{item.name}</option>)}
      </select>
    </div>
  </div>
)

const CategoryContainer = (props) => {
  const {products, categoryDetails, settings, productFilter, productsHasMore, categories, loadingProducts, loadingMoreProducts, productsAttributes} = props.state;
  const {setSort, addCartItem, loadMoreProducts, getJSONLD, setFilterAttribute, unsetFilterAttribute} = props;

  const pageTitle = categoryDetails.meta_title && categoryDetails.meta_title.length > 0 ? categoryDetails.meta_title : categoryDetails.name;
  const title = `${pageTitle}`;

  const jsonld = getJSONLD(props.state);

  const showFilter = themeSettings.show_product_filter;

  productsAttributes.sort((a,b)=>{
    return b.values.length - a.values.length
  })
  var attributes = []
  productsAttributes.some((item,index)=>{
    attributes.push(<Attributes attribute={item} setFilterAttribute={(name,value)=>{
      if (filter[name] != undefined) {
        unsetFilterAttribute(name,filter[name])
      }
      filter[name] = value
      setFilterAttribute(name,value)
    }}/>)
    return index == 2
  })

  return (
    <div>
      <MetaTags
        title={title}
        description={categoryDetails.meta_description}
        canonicalUrl={categoryDetails.url}
        imageUrl={categoryDetails.image}
        ogType="product.group"
        ogTitle={categoryDetails.name}
        ogDescription={categoryDetails.meta_description}
        jsonld={jsonld}
      />
      <HeadBox title={categoryDetails.name} backgroundColor="#87B9B2"/>

      <section id="filter">
        <div className="container">
          {attributes}
          <Sort defaultSort={settings.default_product_sorting} currentSort={productFilter.sort} setSort={setSort} />
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
              loadingProducts={loadingProducts}
              loadingMoreProducts={loadingMoreProducts}
            />
          </div>
      </section>

      <Subscribe />
    </div>
  )
}

export default CategoryContainer
