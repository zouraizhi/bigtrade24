import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import CategoryGallery from '../components/categoryGallery'
import CustomProducts from '../components/products/custom'
import HomeSlider from '../components/homeSlider'
import Categories from '../components/categories'
import Subscribe from '../components/subscribe'

const Fragment = React.Fragment;

class IndexContainer extends React.Component{
  state = {
    selectedTab:'all'
  }

  render() {
    const {pageDetails, categories, settings} = this.props.state;
    const {addCartItem} = this.props;
    const {selectedTab} = this.state

    return (
      <Fragment>
        <MetaTags
          title={pageDetails.meta_title}
          description={pageDetails.meta_description}
          canonicalUrl={pageDetails.url}
          ogTitle={pageDetails.meta_title}
          ogDescription={pageDetails.meta_description}
        />

        <div id="showcase">
          <HomeSlider images={themeSettings.home_slider} />
        </div>

        <Categories categories={categories}/>

        <section id="featured-products">
            <div className="container">
              <h2>Featured Products</h2>
              <nav className="tab">
                <ul>
                  <li>
                    {selectedTab == "all" && <a className= "active" onClick={()=>this.setState({selectedTab: 'all'})}>All</a>}
                    {selectedTab != "all" && <a onClick={()=>this.setState({selectedTab: 'all'})}>All</a>}
                  </li>
                  <li>
                    {selectedTab == "popular" && <a className="active" onClick={()=>this.setState({selectedTab: 'popular'})}>Popular</a>}
                    {selectedTab != "popular" && <a onClick={()=>this.setState({selectedTab: 'popular'})}>Popular</a>}
                  </li>
                  <li>
                    {selectedTab == "new" && <a className="active" onClick={()=>this.setState({selectedTab: 'new'})}>New</a>}
                    {selectedTab != "new" && <a onClick={()=>this.setState({selectedTab: 'new'})}>New</a>}
                  </li>
                  <li>
                    {selectedTab == "sale" && <a className="active" onClick={()=>this.setState({selectedTab: 'sale'})}>Sale</a>}
                    {selectedTab != "sale" && <a onClick={()=>this.setState({selectedTab: 'sale'})}>Sale</a>}
                  </li>
                </ul>
              </nav>

              {selectedTab === 'all' && (
                <CustomProducts
                  sku={themeSettings.home_products_sku}
                  sort={themeSettings.home_products_sort}
                  limit={themeSettings.home_products_limit}
                  settings={settings}
                />
              )}

              {selectedTab === 'popular' && (
                <CustomProducts
                  sort="stock_status,price,position"
                  limit={themeSettings.home_products_limit}
                  settings={settings}
                />
              )}
              {selectedTab === 'new' && (
                <CustomProducts
                  sort="-date_created"
                  limit={themeSettings.home_products_limit}
                  settings={settings}
                />
              )}
              {selectedTab === 'sale' && (
                <CustomProducts
                  sort="-date_created"
                  on_sale
                  limit={themeSettings.home_products_limit}
                  settings={settings}
                />
              )}
            </div>
        </section>

        <Subscribe />

      </Fragment>
    )
  }
}

export default IndexContainer
