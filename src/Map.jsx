/* global MAPBOX_TOKEN, window */

import React from 'react'
import MapGL from 'react-map-gl'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
    this._resize = this._resize.bind(this)
    this._onViewportChange = this._onViewportChange.bind(this)
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

  render() {
    const {viewport} = this.state
    return (
      <div
        className='Map'
        ref={(ref) => { this._refDom = ref }}
      >
        <MapGL
          ref={(ref) => { this._ref = ref } }
          mapStyle='mapbox://styles/mapbox/dark-v9'
          {...viewport}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
        </MapGL>
      </div>
    )
  }
}

export default Map
