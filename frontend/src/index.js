import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {ActionCounter} from './middlewares/ActionCounter';
import {BrowserRouter} from 'react-router-dom'; 
import {setAuthentification} from "./actions";

const invariant = require('redux-immutable-state-invariant').default();

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    invariant,
    ActionCounter
)(createStore);

const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ 
    && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem("token");

if(token) {
    store.dispatch(setAuthentification(true));
}

ReactDOM.render(
    <Provider
        store={store}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
