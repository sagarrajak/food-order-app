import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './redux/reducer/ui';
import '../node_modules/font-awesome/css/font-awesome.css';

import registerServiceWorker from './registerServiceWorker';
const store = createStore(reducer);
ReactDOM.render(  
                    <Provider store={store}>
                        <BrowserRouter><App /></BrowserRouter> 
                    </Provider> , document.getElementById('root')
               );
registerServiceWorker();
