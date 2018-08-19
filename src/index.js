import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer/ui';
import '../node_modules/font-awesome/css/font-awesome.css';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
