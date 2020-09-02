import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../lib/settings'

export default class Subscribe extends React.PureComponent {
  render() {
    const { settings } = this.props;

    return (
      <section id="subscribe">
          <div className="container">
            <h2>Subscribe and Get 15% Off</h2>
            <form>
                <input type="text" placeholder="Your email" aria-label="email"/>
                <a><img src="./assets/images/cestore/ic_send_mail.svg" alt="img"/></a>
            </form>
          </div>
      </section>
    )
  }
}
