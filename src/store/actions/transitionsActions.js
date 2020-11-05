import { v4 as uuidv4 } from 'uuid';

export const addTransition = (transition) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const auth = firebase.auth();

        const { uid } = auth.currentUser;

        firestore.collection(`expenses-${uid}`).add({
            id: uuidv4(),
            description: transition.description,
            amount: transition.amount,
            author: uid,
            category: transition.category,
            discounts: transition.discounts,
            boughtFrom: transition.boughtFrom,
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

export const listTransitions = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const auth = firebase.auth();

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

