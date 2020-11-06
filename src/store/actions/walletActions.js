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

export const deleteWallet = (wallet) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const auth = firebase.auth();

        db.collection('users').doc(auth.currentUser.uid).update({
            wallets: firebase.firestore.FieldValue.arrayRemove(wallet)
        }).then(res => dispatch({type: 'DELETE_WALLET_OK'}))
            .catch(err => dispatch({type: 'DELETE_WALLET_ERROR', error: err.message}))
    }
}

export const addAmountToWallet = (walletID, amount) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const auth = firebase.auth();

        let target=-1;
        let list = [];
        db.collection('users').where('id', '==', auth.currentUser.uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.data().wallets.forEach((item, index) => {
                        if (item.id === walletID)
                            target=index;
                        list.push(item);
                    })
                })

                if (target!==-1)
                    list[target].amount += amount;
                else
                    dispatch({type: 'WALLET_UPDATE_ERROR', error: 'Could not find specific wallet in your profile!'})

                db.collection('users').doc(auth.currentUser.uid).update({
                    wallets: list,
                })
                    .then(res => dispatch({type: 'WALLET_UPDATE_OK', wallets: list}))
                    .catch(err => dispatch({type: 'WALLET_UPDATE_ERROR', error: err.message}))
            }).catch(err => dispatch({type: 'WALLET_UPDATE_ERROR', error: err.message}))
    }
}

export const subtractAmountToWallet = (walletID, amount) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const auth = firebase.auth();

        let target = -1;
        let list = [];

        db.collection('users').where('id', '==', auth.currentUser.uid).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.data().wallets.forEach((item, index) => {
                        if (item.id === walletID)
                            target = index;
                        list.push(item);
                    })
                })
                if (target!==-1)
                    list[target].amount -= amount;
                else
                    dispatch({type: 'WALLET_UPDATE_ERROR', error: 'Could not find specific wallet in your profile!'})

                db.collection('users').doc(auth.currentUser.uid).update({
                    wallets: list,
                })
                    .then(res => dispatch({type: 'WALLET_UPDATE_OK', wallets: list}))
                    .catch(err => dispatch({type: 'WALLET_UPDATE_ERROR', error: err.message}))
            }).catch(err => dispatch({type: 'WALLET_UPDATE_ERROR', error: err.message}))
    }
}