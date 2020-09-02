import React from 'react'
import { NavLink } from 'react-router-dom'
import * as helper from '../../lib/helper'
import { themeSettings, text } from '../../lib/settings'

const Option = ({ option, onChange }) => {
  const values = option.values
    .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    .map((value, index) => (
    <option key={index} value={value.id}>{value.name}</option>
  ))

  const notSelectedTitle = `${text.selectOption} ${option.name}`;

  return (
    <div className="filter-item">
      <h4>{option.name}</h4>
      <div className="dropdown">
        <select onChange={e => {onChange(option.id, e.target.value)}}>
        <option value="">{notSelectedTitle}</option>
        {values}
        </select>
      </div>
    </div>
  )
}

const Options = ({ options, onChange }) => {
  if(options && options.length > 0) {
    const items = options.map((option, index) => (
      <Option key={index} option={option} onChange={onChange} />
    ))

    return (
      <div className="variant">
        {items}
      </div>
    )
  } else {
    return null;
  }
}
export default Options;
