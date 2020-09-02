import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../../lib/settings'
import ItemTags from './itemTags'
import ItemImage from './itemImage'
import ItemPrice from './itemPrice'

class Item extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      liked: false
    }
  }
  render() {
    const {product, addCartItem, settings} = this.props
    const placeholderHeight = themeSettings.list_image_max_height && themeSettings.list_image_max_height > 0 ? themeSettings.list_image_max_height : 200;

    return (
        <div className="item">
          <div className="img-wrap">
            <NavLink to={product.path}><ItemImage images={product.images} productName={product.name} height={placeholderHeight} /></NavLink>
            <a onClick={this.likeProduct} className="btn-favorite"><img alt="img" src={this.state.liked ? "/assets/images/cestore/ic_liked.svg" : "/assets/images/cestore/ic_like.svg"} /></a>
          </div>
          <NavLink to={product.path}><h4>{product.name}</h4></NavLink>
          <ItemPrice product={product} settings={settings} />
        </div>
    )
  }

  componentDidMount(){
    this.setState({liked: this.isLikedProduct(this.props.product)})
  }

  isLikedProduct = (product)=>{
    var products = localStorage.getItem("liked_products");
    var existed = false
    if (products) {
      products = JSON.parse(products)

      products.forEach((item, i)=>{
        if (product.id == item.id) {
          existed = true
          return
        }
      })
      return existed
    }

    return existed
  }

  likeProduct = ()=>{
    let {product} = this.props
    var products = localStorage.getItem("liked_products");
    var existed = false

    if (products) {
      products = JSON.parse(products)

      var index = -1
      products.forEach((item, i)=>{
        if (product.id == item.id) {
          existed = true
          index = i
          return
        }
      })

      if (existed) {
        products.splice(index,1)
      }else{
        products.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.images.length > 1 ? product.images[0].url : ""
        })
      }
    }else{
      products=[{
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.images.length > 1 ? product.images[0].url : ""
      }]
    }

    localStorage.setItem("liked_products",JSON.stringify(products));
    this.setState({liked: !existed})
  }

}

export default Item
