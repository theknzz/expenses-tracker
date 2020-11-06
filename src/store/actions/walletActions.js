import {v4 as uuidv4} from "uuid";

export const getWallets = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const auth = firebase.auth();

        const { uid } = auth.currentUser;

        let wallets = [];
        db.collection('users').where('id', '==', uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.data().wallets.forEach(wallet => wallets.push({
                        name: wallet.name,
                        id: wallet.id,
                        icon: wallet.icon,
                        amount: wallet.amount,
                    }))
                })
                dispatch({type: 'GET_WALLETS_OK', wallets})
        })
            .catch(err => {
                console.error(err)
                dispatch({type: 'GET_WALLETS_ERROR', error: err.message})
            })
    }
}

export const createWallet = (wallet) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const auth = firebase.auth();

        const newWallet = {
            name: wallet.name,
            id: uuidv4(),
            icon: wallet.icon,
            amount: wallet.amount,
        }

        db.collection('users').doc(auth.currentUser.uid).update({
                wallets: firebase.firestore.FieldValue.arrayUnion(newWallet)
            })
            .then(res => {
                dispatch({type: 'CREATE_WALLET_OK', wallet: newWallet})
            })
            .catch(err => {
                dispatch({type: 'CREATE_WALLET_ERROR', error: err.message})
            })
    }
}