import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../lib/settings'

export default class Footer extends React.PureComponent {
  render() {
    const { settings } = this.props;

    return (
      <footer>
        <nav>
          <ul>
            <li><a href="#">Policy</a></li>
            <li><a href="#">Terms</a></li>
            <li><NavLink to="/faq">FAQS</NavLink></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Youtube</a></li>
            <li><a onClick={this.props.onSignIn}>Sign In</a></li>
            <li><a onClick={this.props.onSignUp}>Sign Up</a></li>
          </ul>
        </nav>
          <div className="copyright">
            © 2018 CeStore
          </div>
      </footer>
    )
  }
}
