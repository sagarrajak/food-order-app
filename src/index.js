import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import '../node_modules/font-awesome/css/font-awesome.css';
import registerServiceWorker from './registerServiceWorker';

//Reducers 
import uiReducer from './redux/reducer/ui';
import loginReducer from './redux/reducer/login';
import signupReducer from './redux/reducer/signup';
import authReducer from './redux/reducer/auth';
import cartReducer from './redux/reducer/cart';

const newReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer, 
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer
}, applyMiddleware(thunk));

const store = createStore(newReducer);
ReactDOM.render(  
                <Provider store={store}>
                    <BrowserRouter><App /></BrowserRouter> 
                </Provider> , document.getElementById('root')
               );
registerServiceWorker();
