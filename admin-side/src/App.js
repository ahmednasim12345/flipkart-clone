import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import  PrivateRoute from './components/HOC/PrivateRoute'
import {  isUserLoggedIn } from './actions/';
import { useDispatch,useSelector } from 'react-redux';
import Product from './container/Product';
import Category from './container/Category';
import Order from './container/Order';
import { getInitialData } from './actions/initialData.action';
import Page from './container/Page';
function App() {
  const dispatch = useDispatch();
   const auth = useSelector(state => state.auth);
  // componentDidMount or CompodIdUPdate 
   useEffect(() =>{
     if(!auth.authenticate){
      dispatch(isUserLoggedIn());
     }
     
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  
   },[auth.authenticate]);
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" exact component={Home} />
        <PrivateRoute  path="/page" exact component={Page} />
        <PrivateRoute path="/product" component={Product}/>
        <PrivateRoute path="/category" component={Category}/>
        <PrivateRoute path="/orders" component={Order}/>
       
        
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />

      </Switch>

    </Router>
  );
}

export default App;
