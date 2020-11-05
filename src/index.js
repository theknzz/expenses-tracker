import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getFirestore } from "redux-firestore";
import { createFirestoreInstance } from "redux-firestore";
import rootReducer from './store/reducers/rootReducer'
import firebase from './config/firebaseConfig'
import 'firebase/firestore'

const middlewares = [
    thunk.withExtraArgument({ getFirebase, getFirestore })
]

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
}

const store = createStore(rootReducer,
    compose(
        applyMiddleware(...middlewares),
    )
);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
