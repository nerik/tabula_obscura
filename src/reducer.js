import DEFAULT_MAP_STYLE from './style.json'

const initialState = {
  style: DEFAULT_MAP_STYLE,
  countryHover: null
}

export const COUNTRY_HOVER = 'COUNTRY_HOVER'

export default function(state = initialState, action) {
  switch (action.type) {
  case COUNTRY_HOVER : {
    const style = {...state.style}
    style.layers.find(layer => layer.id === 'countries-select').filter = [
      '==',
      'NAME',
      action.feature.properties.NAME
    ]
    return {
      ...state,
      style,
    }
  }
  default:
    return state
  }
}
