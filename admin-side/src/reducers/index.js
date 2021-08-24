import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from './user.reducer'
import productReducer from './product.reducers';
import categoryReducer from './category.reducers';
import orderReducer from './order.reducers';
import pageReducer from './page.reducers'

const rootReducer = combineReducers({
   auth: authReducer,
   user : userReducer,
   product: productReducer,
   category: categoryReducer,
   order: orderReducer,
   page: pageReducer
   
});
export default rootReducer;