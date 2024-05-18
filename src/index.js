import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from 'global/GlobalStyle';
import { App } from 'App';
import store, { persistor } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/ReadJourney">
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
