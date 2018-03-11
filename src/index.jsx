import React from 'react'
import {render} from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from './reducer'
import {init} from './actions'
import './index.css'
import MapContainer from './Map-container'
import 'mapbox-gl/dist/mapbox-gl.css'
import './index.css'


const reducers = combineReducers({
  app : reducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)
// store.dispatch(init())

render(
  <Provider store={store}>
    <MapContainer />
  </Provider>,
  document.body.appendChild(document.createElement('div')) // eslint-disable-line no-undef
)

