import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../../lib/settings'
import ItemTags from './itemTags'
import ItemImage from './itemImage'
import ItemPrice from './itemPrice'

class EmptyItem extends React.Component {

  render() {
    const placeholderHeight = themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0 ? themeSettings.list_image_max_height : 200;
    return (
      <a>
        <div className="item">
          <div className="shimmer-item" style={{width:'100%',height:'420px'}}></div>
        </div>
      </a>
    )
  }

}

export default EmptyItem
