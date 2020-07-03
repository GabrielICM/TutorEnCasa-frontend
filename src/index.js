import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import allReducers from './Reducers/allReducers';
import {createStore} from 'redux';
import isLogged from './Reducers/islogged';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
const store = createStore(
    isLogged, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(

    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
