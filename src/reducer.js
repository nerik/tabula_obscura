const initialState = {
  resort : null,
}

export const SOME_ACTION = 'SOME_ACTION'

export default function(state = initialState, action) {
  switch (action.type) {
  case SOME_ACTION : {
    return {
      ...state,
      thing : action.payload,
    }
  }
  default:
    return state
  }
}
