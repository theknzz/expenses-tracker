import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from './authReducer'
import transitionsReducer from "./transitionsReducer";
import walletReducer from './walletReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    transitions: transitionsReducer,
    wallet: walletReducer,
})

export default rootReducer