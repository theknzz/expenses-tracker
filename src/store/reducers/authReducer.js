const initialState = {
    error: '',
}

const authReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.user,
                error: '',
            };
        case 'LOGIN_ERROR':
            return {
                ...state,
                error: action.error,
                user: null,
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: null,
                error: '',
            };
        case 'LOGOUT_ERROR':
            return {
                ...state,
                error: action.error,
            };
        case 'USER_LOGGED':
            return {
                ...state,
                user: action.user,
            }
        case 'USER_NOT_LOGGED':
            return {
                ...state,
                error: 'User not logged!'
            }
        default:
            return state;
    }
}

export default authReducer;