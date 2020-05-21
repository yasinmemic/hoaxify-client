import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/container/App'
import * as serviceWorker from './serviceWorker';
import './bootstrap-override.scss'
import './i18n'
import { Provider } from 'react-redux'
import configureStore from './redux/reducers/configureStore'


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
