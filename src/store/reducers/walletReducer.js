const initialData = {
    error: '',
    wallets: [],
}

const walletReducer = (state = initialData, action) => {
    console.log(state)
    switch (action.type) {
        case 'GET_WALLETS_OK':
            return {
                ...state,
                wallets: action.wallets,
                error: '',
            }
        case 'GET_WALLETS_ERROR':
            return {
                ...state,
                error: action.error,
            }
        case 'CREATE_WALLET_OK':
            return {
                ...state,
                wallets: [...state.wallets, action.wallet],
                error: '',
            }
        case 'CREATE_WALLET_ERROR':
            return {
                ...state,
                error: action.error,
            }
        case 'WALLET_UPDATE_OK':
            return {
                ...state,
                wallets: action.wallets,
                error: '',
            }
        case 'WALLET_UPDATE_ERROR':
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default walletReducer