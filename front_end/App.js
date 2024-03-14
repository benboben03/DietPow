import React from 'react';
import AppNavigator from './components/AppNavigator.js';
import {Provider} from 'react-redux';
import store from './store.js';

const App = () => (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );

  export default App;