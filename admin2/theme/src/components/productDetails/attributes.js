import React from 'react'
import { themeSettings, text } from '../../lib/settings'

const Attribute = ({ name, value }) => (
  <div className="product-attribute">
    <div className="attribute-name">
      {name}:
    </div>
    <div className="attribute-value">
      {value}
    </div>
  </div>
)

const Attributes = ({ attributes }) => {
  if(attributes && attributes.length > 0) {
    const items = attributes.map((attribute, index) => (
      <Attribute key={index} name={attribute.name} value={attribute.value} />
    ))

    return (
      <div className="product-attributes">
        {items}
      </div>
    )
  } else {
    return null;
  }
}
export default Attributes;
