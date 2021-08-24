import { productConstants } from "../actions/constants"


const initState = {
    products : []
}
export default( state = initState , action) =>{
      switch(action.type){
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products : action.payload.products
            }
            break;
            default:
                break;
      }
      return state;
}