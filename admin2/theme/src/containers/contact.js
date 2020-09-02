import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import HeadBox from '../components/headBox'
import * as helper from '../lib/helper'
import Subscribe from '../components/subscribe'

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBtBA_wIpyYJewXlIUZyUJ60403zS5uWKo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    <Marker position={{ lat: -34.397, lng: 150.644 }} />
  </GoogleMap>
));

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
        <HeadBox title="Contact" backgroundColor="#B6D280"/>

        <p className="container contact-title">Drop us a Line.</p>

        <section className="container">
          <div className="contact-item">
            <div className="contact-item-wrap">
              <p className="contact-item-label">Address</p>
              <p className="contact-item-value">103B SBI building, Quang Trung Software park, Ho Chi Minh city, VietNam</p>
            </div>
          </div>
          <div className="contact-item contact-item-center">
            <div className="contact-item-wrap">
              <p className="contact-item-label">Call-center</p>
              <p className="contact-item-value">+1 212-490-2121</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-item-wrap">
              <p className="contact-item-label">Email</p>
              <p className="contact-item-value">support@inspireui.com</p>
            </div>
          </div>
        </section>

        <section className="container contact-map">
          <MapComponent key="map"/>
        </section>
        <Subscribe />
      </div>
    )
  }


}

export default AboutContainer
