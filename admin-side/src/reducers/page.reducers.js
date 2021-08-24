import { pageConstant } from "../actions/constants"

const initState = {
    error: null,
    loading: false,
    page: {}
}
export default  (state = initState, action ) =>{
  switch(action.type){
      case pageConstant.CREATE_PAGE_REQUEST:
          state = {
              ...state,
              loading: true,

          }
          break;

          case pageConstant.CREATE_PAGE_SUCCESS: 
          state = {
              ...state,
              loading : false,
          }
          break;
          case pageConstant.CREATE_PAGE_FAILURE:
              state = {
                  ...state,
                  loading: false,
                  error: action.payload.error
              }
          default:
              break;
  }
  return state;


}