import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from './authReducer'
import transactionsReducer from "./transactionsReducer";
import walletReducer from './walletReducer'

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    transactions: transactionsReducer,
    wallet: walletReducer,
})

export default rootReducer