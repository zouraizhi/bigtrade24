import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import HeadBox from '../components/headBox'
import * as helper from '../lib/helper'
import Subscribe from '../components/subscribe'

class AboutContainer extends React.Component {

  render() {
    let {pageDetails, settings} = this.props.state

    return (
      <div>
        <MetaTags
          title={pageDetails.meta_title}
          description={pageDetails.meta_description}
          canonicalUrl={pageDetails.url}
          ogTitle={pageDetails.meta_title}
          ogDescription={pageDetails.meta_description}
        />
        <HeadBox title="About" backgroundColor="#9DD6E1"/>

        <article className="container about-item">
          <img src="/assets/images/cestore/about/img3.png" alt="img"/>
          <div className="about-item-content">
            <div className="about-item-circle"></div>
            <p>InspireUI is an production company that provides both products and services related to Mobile app design, prototypes and development. Mobile UI/UX based React Native framework is the focus of InspireUI.</p>
          </div>
        </article>

        <article className="container about-item">
          <div className="about-item-content">
            <div className="about-item-circle"></div>
            <p>Customer is an inspiration and a heart of InspireUI business. InspireUI are serving customers worldwide, including business owners and developers who want to build e icient apps. InspireUI empowers clients to build their apps in short period of time, excellent UI & UX design, with reasonable budget. InspireUI ensures products/ services delivered on time, best performance, high stability and with free bug fix. By that, most of customers satisfied with InspireUI’s products and services.</p>
          </div>
          <img src="/assets/images/cestore/about/img4.png" alt="img"/>
        </article>

        <Subscribe />
      </div>
    )
  }


}

export default AboutContainer
