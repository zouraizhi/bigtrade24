import React from 'react'
import { themeSettings, text } from '../../lib/settings'
import CustomProducts from '../products/custom'
const Fragment = React.Fragment;

export default class RelatedProducts extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { ids, settings, addCartItem, limit } = this.props;
    if(ids && ids.length > 0) {
      let title = themeSettings.related_products_title && themeSettings.related_products_title.length > 0
        ? themeSettings.related_products_title
        : text.relatedProducts;

      return (
        <section id="featured-products">
            <div className="container">
              <h2 style={{marginBottom:"20px"}}>{title}</h2>
                <CustomProducts
                  ids={ids}
                  sort={null}
                  limit={limit}
                  isCentered={true}
                  settings={settings}
                  addCartItem={addCartItem}
                />
            </div>
        </section>
      )
    } else {
      return null;
    }
  }
}
