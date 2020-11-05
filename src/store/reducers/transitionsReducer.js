const initialData = {
    error: '',
    docs: [],
}

const transitionsReducer = (state = initialData, action) => {
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
                docs: action.docs,
            }
        case 'QUERY_ERROR':
            return {
                ...state,
                error: action.error,
                docs: [],
            }
        default:
            return state;
    }
}

export default transitionsReducer