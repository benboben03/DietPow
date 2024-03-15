import { createStore } from 'redux';

const initialState = {
  userEmail: '',
  targetWeight: 0,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, userEmail: action.payload };
    case 'SET_TARGET_WEIGHT':
      return { ...state, targetWeight: action.payload };
    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;
