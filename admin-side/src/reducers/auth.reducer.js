import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false
};


const authReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,

            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true,
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                payload: action.payload.error
            }
            break;

            case authConstants.LOGOUT_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
                break;
            case authConstants.LOGOUT_SUCCESS:
                state = {
                    ...initState
                }
                break;
            case authConstants.LOGOUT_FAILURE:
                state = {
                    ...state,
                    error: action.payload.error,
                    loading: false
                }
                break;
            

        default:
            break;

    }
    return state;
}
export default authReducer;