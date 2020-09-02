import React from 'react'
import { NavLink } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import { themeSettings, text } from '../lib/settings'
import * as helper from '../lib/helper'

class Categories extends React.Component {
  render() {
    let {categories} = this.props
    var list = []
    var large = true
    var items = []
    categories.forEach((item)=>{
        if (large) {
          items.push(
            <NavLink to={item.path} aria-label={item.name}>
              <div className="large-item" style={{'background-image': "url("+item.image+")"}}>
                <div className="foreground" />
                <h2>{item.name}</h2>
                <img src="./assets/images/cestore/ic_detail.svg" alt="img"/>
              </div>
            </NavLink>
          )
          large = false
        }else{
          list.push(item)
          if (list.length == 2) {
            items.push(
              <div className="item-wrap">
                {list.map((item)=>(
                  <NavLink to={item.path} aria-label={item.name}>
                    <div className="item" style={{'background-image': "url("+item.image+")"}}>
                      <div className="foreground" />
                      <h2>{item.name}</h2>
                      <img src="./assets/images/cestore/ic_detail.svg" alt="img"/>
                    </div>
                  </NavLink>
                ))}
              </div>
            )
            large = true
            list = []
          }
        }
    })

    if (list.length > 0) {
      items.push(
        <div className="item-wrap">
          {list.map((item)=>(
            <div className="item" style={{'background-image': "url("+item.image+")"}}>
              <div className="foreground" />
              <h2>{item.name}</h2>
              <NavLink to={item.path}><img src="./assets/images/cestore/ic_detail.svg" alt="img"/></NavLink>
            </div>
          ))}
        </div>
      )
    }
    return (
      <section id="categories">
          <div className="container">
            <div className="categories-wrap">
              {items}
            </div>
            <p className="description">Welcome to CeStore! We offers hottest fashion by trend and seasons. Order online with our easy to use mobile app. The app offers streamlined ordering and app only specials not offered on our website.</p>
          </div>
      </section>
    )
  }
}

export default Categories;
