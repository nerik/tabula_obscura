/* global MAPBOX_TOKEN, window */

import React from 'react'
import MapGL from 'react-map-gl'
import {centroid} from '@turf/turf'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: 0,
        zoom: 3
      }
    }
    this._resize = this._resize.bind(this)
    this._onViewportChange = this._onViewportChange.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onHover= this._onHover.bind(this)
  }


  componentDidMount() {
    window.addEventListener('resize', this._resize)
    this._resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize)
  }

  _resize() {
    const mapContainerStyle = window.getComputedStyle(this._refDom)
    this.setState({
      viewport : {
        ...this.state.viewport,
        width : parseInt(mapContainerStyle.width, 10),
        height : parseInt(mapContainerStyle.height, 10),
      },
    })
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport : {...this.state.viewport, ...viewport},
    })
  }

  _onClick(event) {
    const {features, srcEvent: {offsetX, offsetY}} = event
    console.log(event)
    console.log(features)
    const feature = features && features.find(f => f.layer.id === 'countries-select')
    // console.log(feature.geometry.coordinates)
    if (feature) {
      const c = centroid(feature)
      this.setState({
        viewport : {...this.state.viewport, latitude: c.geometry.coordinates[1], longitude: c.geometry.coordinates[0]},
      })
      // console.log(this._ref)
      // console.log(this._ref.getMap().setFilter)
      // this._ref.getMap().setFilter('countries-robinson-cmby81', ["==", "name", feature.name]);
      // console.log(this._ref.getMap().setFilter('countries-robinson-cmby81', ["==", "name", e.features[0].properties.name]);)
    }

  }

  _onHover(event) {
    const {features} = event
    console.log(features)
    const feature = features && features.find(f => f.layer.id === 'countries')
    if (feature) {
      this.props.countryHover(feature)
    }
  }

  render() {
    const {viewport} = this.state
    return (
      <div
        className='map'
        ref={(ref) => { this._refDom = ref }}
      >
        <MapGL
          ref={(ref) => { this._ref = ref } }
          mapStyle={this.props.style}
          // mapStyle='mapbox://styles/nerik/cjemnhij034mf2sokzuj11ab3'
          // mapStyle='mapbox://styles/mapbox/dark-v9'
          {...viewport}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onClick={this._onClick}
          onHover={this._onHover}
        >
        </MapGL>
      </div>
    )
  }
}

export default Map
