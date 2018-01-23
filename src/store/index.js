import { createStore } from 'redux';

const initialState = {
  user: undefined,
  messages: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const newState = Object.assign({}, state);
      newState.user = action.user;
      console.log('state', newState);
      return newState;
    case 'FETCH_MESSAGES':
      const fetchState = Object.assign({}, state);
      fetchState.messages = action.messages;
      return fetchState;
    default:
      return state
  }
}

export default createStore(reducer);
