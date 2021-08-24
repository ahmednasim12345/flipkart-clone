import { userConstansts } from "../actions/constants";

const initState = {
    address: [],
    orders: [],
    error: null,
    loading: false,
    orderFeaching: false,
}
const addressReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstansts.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstansts.GET_USER_ADDRESS_SUCEESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false
            }
            break;

        case userConstansts.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        case userConstansts.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstansts.ADD_USER_ADDRESS_SUCEESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false
            }
            break;
        case userConstansts.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case userConstansts.GET_USER_ORDER_ADDRESS_REQUEST:
            state = {
                ...state,
                orderFeaching: true,
            }
            break;
        case userConstansts.GET_USER_ORDER_ADDRESS_SUCEESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderFeaching: false,
            }
            break;
        case userConstansts.GET_USER_ORDER_ADDRESS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                orderFeaching: false,
            }
            break;
        default:
            break;

    }
    return state;
}
export default addressReducer;