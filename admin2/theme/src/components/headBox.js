import React from 'react'
import { NavLink } from 'react-router-dom'
import { themeSettings, text } from '../lib/settings'

export default class HeadBox extends React.PureComponent {
  render() {
    const { title, backgroundColor } = this.props;

    return (
      <section>
        <div className="container head-box" style={{"backgroundColor":backgroundColor}}>
            <h1>{title}</h1>
        </div>
      </section>
    )
  }
}
