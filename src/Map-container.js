import {connect} from 'react-redux'
import Map from './Map.jsx'
import {countryHover} from './actions'

const mapStateToProps = state => ({
  style: state.app.style
})

const mapDispatchToProps = dispatch => ({
  countryHover: (feature) => {
    dispatch(countryHover(feature))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
