import { combineReducers } from "redux";
import categoryReducer from './category.reducers';
import productReducer from './product.reducer';
import userReducer from './user.redurer';
import cartReducer from './cart.reducer';
import addressReducer from './address.reducer';
const rootReducer = combineReducers({
   
   category: categoryReducer,
   product: productReducer,
   auth : userReducer,
   cart : cartReducer,
   user: addressReducer

 
  
});
export default rootReducer;