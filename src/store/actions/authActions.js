export const signIn = () => {
    return ( dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const auth = firebase.auth();
        const db = firebase.firestore();
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(googleAuthProvider)
            .then(res => {
                db.collection('users').doc(auth.currentUser.uid).set({
                    id: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    wallets: [{name: 'total'}],
                }, {merge: true}).then( r => dispatch({type: 'LOGIN_SUCCESS', user: auth.currentUser}))
                    .catch(err => {
                        console.error(err)
                        dispatch({type: 'LOGIN_ERROR', error: err.message})
                    })
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