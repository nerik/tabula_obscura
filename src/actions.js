import {
  SOME_ACTION
} from './reducer'

export function init() {
  return (dispatch) => {
    dispatch({
      type : SOME_ACTION,
      payload : 'blah'
    })
  }
}
