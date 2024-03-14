import { createStore } from 'redux';

const initialState = {
  userEmail: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, userEmail: action.payload };
    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;
