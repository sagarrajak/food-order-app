import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import uiReducer from './redux/reducer/ui';
import loginReducer from './redux/reducer/login';
import authReducer from './redux/reducer/auth';

import '../node_modules/font-awesome/css/font-awesome.css';
import registerServiceWorker from './registerServiceWorker';

const newReducer = combineReducers({
    login: loginReducer,
    auth: authReducer,
    ui: uiReducer
});
const store = createStore(newReducer);
ReactDOM.render(  
                    <Provider store={store}>
                        <BrowserRouter><App /></BrowserRouter> 
                    </Provider> , document.getElementById('root')
               );
registerServiceWorker();
