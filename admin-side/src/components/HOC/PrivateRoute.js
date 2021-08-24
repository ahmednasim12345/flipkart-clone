import React from 'react'
import {Route ,Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component,...rest}) =>{
    return <Route {...rest} component={(props) =>{
        // stored in localStorage
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props}/>
        }else{
            return <Redirect to={`/signin`} />
        }
    }}/>
}
export default PrivateRoute;
