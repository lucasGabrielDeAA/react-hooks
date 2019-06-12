import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import store from './store';

import Container from './components/Container';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container />
      </div>
    </Provider>
  );
}

export default App;
