import { v4 as uuidv4 } from 'uuid';

export const addTransaction = (transaction) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const auth = firebase.auth();

        if (!auth.currentUser) return dispatch({type: 'USER_NOT_LOGGED'});

        const { uid } = auth.currentUser;

        firestore.collection(`expenses-${uid}`).add({
            id: uuidv4(),
            description: transaction.description,
            amount: transaction.amount,
            author: uid,
            category: transaction.category,
            discounts: transaction.discounts,
            boughtFrom: transaction.boughtFrom,
            date: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(res => {
            dispatch({type: 'TRANSITION_DONE'})
        })
            .catch(err => {
                console.error(err);
                dispatch({type: 'TRANSITION_ERROR', error: err.message})
            })
    }
}

export const listTransactions = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const auth = firebase.auth();

        if (!auth.currentUser) return dispatch({type: 'USER_NOT_LOGGED'});

        const { uid } = auth.currentUser;

        firestore.collection(`expenses-${uid}`).where('author', '==', uid).get()
            .then(querySnapshot => {
                let docs = [];
                querySnapshot.forEach( doc => {
                    docs.push(doc);
                })
                dispatch({ type: 'QUERY_SUCCESS', docs})
            })
            .catch(err => dispatch({type: 'QUERY_ERROR', error: err.message}))
    }
}

