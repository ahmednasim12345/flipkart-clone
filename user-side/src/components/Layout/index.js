
import React from 'react'
 import Header from '../Header' 
import MenuHeader from '../MenuHeader'
 
/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <React.Fragment>
     <Header/>
     <MenuHeader/>
     {props.children}
 </React.Fragment>
   )

 }

export default Layout