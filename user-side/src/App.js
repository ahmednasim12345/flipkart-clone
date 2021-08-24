
import './App.css';
import HomePage from './containers/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { isUserLoggedIn } from './actions/user.action';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import { updateCart } from './actions';
import CheckOutPage from './containers/CheckOutPage';
import OrderPage from './containers/OrderPage';



 
function App() {

  // useEffect 

  const  dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() =>{
    if(!auth.authenticate){
     dispatch(isUserLoggedIn());
    }
  },[auth.authenticate]);

  // update to cart
  useEffect(()=>{
    dispatch(updateCart())
  }, [auth.authenticate]);
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route path="/" exact component={HomePage} />
         <Route path="/cart" exact component={CartPage} />
         <Route path="/checkout"  component={CheckOutPage} />
         <Route path="/account/order"  component={OrderPage} />

         <Route path="/:productSlug/:productId/p"  component={ProductDetailsPage} />
          <Route path="/:slug"  component={ProductListPage} />
       
       </Switch>
     </Router>
    </div>
  );
}

export default App;
