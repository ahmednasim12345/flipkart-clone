import { productConstant } from "../actions/constants"

const initState = {
    products: [],
   productsByPrice: {
       under5k: [],
       under10k: [],
       under15k: [],
       under20k: [],
       under25k: [],
       under30k: [],

   },
   pageRequest: false,
   page: {},
   error: null,
   productDetails: {},
   loading: false
}
const productReducer = (state= initState, action) =>{
  switch(action.type){
      case productConstant.GET_PRODUCT_BY_SLUG_SUCCESS:
        //   console.log(" products ==>" ,action.payload.products)
          state = {
              ...state,
              products: action.payload.products,
              productsByPrice :{
                    ...action.payload.productsByPrice
              }
          }
          break;
          case productConstant.GET_PRODUCT_BY_PAGE_REQUEST:
            state = {
              ...state,
              pageRequest: true,
            }
            break;
            case productConstant.GET_PRODUCT_BY_PAGE_SUCCESS:
            state = {
              ...state,
              page: action.payload.page,
              pageRequest: false,
            }
            break;
            case productConstant.GET_PRODUCT_BY_PAGE_FAILURE:
            state = {
              ...state,
              pageRequest: false,
              error: action.payload.error
            }
            break;
           case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
             state ={
               ...state,
               loading: true
             } 
             break;
             case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
               state ={
                 ...state,
                 loading: false,
                 productDetails: action.payload.productDetails
               }
               break;
               case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
                 state ={
                   ...state,
                   loading: false,
                   error: action.payload.error
                 }
                 break;
          default:
              break;
  }
  return state;
}
export default productReducer;