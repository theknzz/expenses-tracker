const initialData = {
    error: '',
    transactions: [],
}

const transactionsReducer = (state = initialData, action) => {
    switch (action.type) {
        case 'TRANSITION_DONE':
            console.log('done')
            return {
                ...state,
                error: '',
            }
        case 'TRANSITION_ERROR':
            return {
                ...state,
                error: action.error,
            }
        case 'QUERY_SUCCESS':
            return {
                ...state,
                error: '',
                transactions: action.docs,
            }
        case 'QUERY_ERROR':
            return {
                ...state,
                error: action.error,
                transactions: [],
            }
        default:
            return state;
    }
}

export default transactionsReducer