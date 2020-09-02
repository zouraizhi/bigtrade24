import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../../lib/settings'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const CartCount = ({ cart }) => {
  if (cart && cart.items && cart.items.length > 0) {
    let itemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);
    return <div id="badge">{itemsCount}</div>
  } else {
    return null;
  }
}

export default class Header extends React.Component {
  state = {
    showSearch: false,
    searchText:''
  }

  render() {
    const {categories, cart, settings, currentPage, location, productFilter} = this.props.state;
    var items = []
    categories.some((item,index)=>{
      items.push(<li key={index}><NavLink to={item.path}>{item.name}</NavLink></li>)
      return index == 1
    })

    let {showSearch,searchText} = this.state

    return (
      <header>
        <div className="container header">
          <nav>
            <ul>
              {items}
              <li><a href="https://inspireui.com">About</a></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <NavLink id="name" to="/">
            <h1>Cestore</h1>
          </NavLink>
          <div className="right-menu">
            <div className="search-wrap">
              <div className="search-content">
                <div className="input-wrap">
                  <input type="text" value={searchText} onChange={this.handleChange} aria-label="search"/>
                </div>
                <div className={`overlay ${showSearch ? "hide-overlay" : ""}`}></div>
              </div>
            </div>
            <ul>
              <li>
                <div className="search-icon">
                  <img src="/assets/images/close.svg" onClick={this.onSearch} alt="img"/>
                  <img className={`${showSearch ? "hide-top" : ""}`} src="/assets/images/cestore/ic_search.svg" alt="img" onClick={this.onSearch}/>
                </div>
              </li>
              <li><NavLink to="/favorite"><img src="/assets/images/cestore/ic_favorite.svg" alt="img" aria-label="favorite"/></NavLink></li>
              <li id="cart">
                <NavLink to="/cart"><img src="/assets/images/cestore/ic_cart.svg" alt="img" aria-label="cart"/></NavLink>
                <CartCount cart={cart}/>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }

  onSearch = ()=>{
    let {showSearch} = this.state
    this.setState({showSearch: !showSearch})
    if (showSearch) {
      this.setState({searchText:''})
      this.props.setLocation("/")
    }
  }

  handleChange = (event) => {
    let searchText = event.target.value
    this.setState({searchText});
    this.handleSearch(searchText)
  }

  handleSearch = (search) => {
    if (this.props.state.currentPage.path === '/search') {
      this.props.setSearch(search)
    } else if (search && search !== '') {
      this.props.setLocation(`/search?search=${search}`)
    }
  }
}
