import { v4 as uuidv4 } from 'uuid';

export const signIn = () => {
    return ( dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const auth = firebase.auth();
        const db = firebase.firestore();
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(googleAuthProvider)
            .then(res => {
                db.collection('users').doc(auth.currentUser.uid).get()
                    .then(doc => {
                        if (!doc.exists) {
                            db.collection('users').doc(auth.currentUser.uid).set({
                                id: auth.currentUser.uid,
                                name: auth.currentUser.displayName,
                                wallets: [{
                                    name: 'total',
                                    id: uuidv4(),
                                    icon: 'http://placecorgi.com/50/50',
                                    amount: 0,
                                }],
                            }, {merge: true})
                                .then( r => dispatch({type: 'LOGIN_SUCCESS', user: auth.currentUser}))
                                .catch(err => {
                                    console.error(err)
                                    dispatch({type: 'LOGIN_ERROR', error: err.message})
                                })
                        }
                        dispatch({type: 'LOGIN_SUCCESS', user: auth.currentUser})
                    });
            })
            .catch(err => {
                dispatch({type: 'LOGIN_ERROR', error: err.message})
            });
    }
}

export const signOut = () =>  {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const auth = firebase.auth();

        auth.signOut()
            .then(res => {
                dispatch({type: 'LOGOUT_SUCCESS'})
            })
            .catch(err => {
                dispatch({type: 'LOGOUT_ERROR', error: err.message})
            })
    }
}

export const update = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const auth = firebase.auth();

        console.log('updating...', auth.currentUser)

        auth.currentUser ? dispatch({type: 'USER_LOGGED', user: auth.currentUser}) : dispatch({type: 'USER_NOT_LOGGED'})
    }
}