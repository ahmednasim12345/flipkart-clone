import { registerConstants } from "../actions/constants";


const initState = {
    loading: false,
    error: null,
    message: ""
}

export default (state = initState, action) =>{
   console.log(action)
    switch(action.type){
        case registerConstants.REGISTER_REQUEST:
            state={
                ...state,
                loading: true,
            }
            break;
        case registerConstants.REGISTER_SUCCESS:
            state ={
                ...state,
                loading:false,
                action: action.payload.message,
               

            }
          break;
          case registerConstants.REGISTER_FAILURE:
            state ={
                ...state,
                error: action.data.error,

            }  
            break;
            default:
            break;
    }
    return state
}