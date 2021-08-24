import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {signout} from '../../actions/'
/**
* @author
* @function 
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const  dispatch = useDispatch();


  const logout = () =>{
    dispatch(signout());
  }

  const renderLoginHeaderLinks = () => {
    return (

      <Nav>
        <li class="nav-item">
          <span className="nav-link" onClick={logout}>Signout</span>
        </li>

      </Nav>
    );
  }

  // for loginUser 

  const renderNonLoginHeaderLinks = () => {
    return (
      <Nav>
        <li class="nav-item">
          <NavLink to="/signin" className="nav-link">Signin</NavLink>
        </li>
        <li class="nav-item">
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </li>



      </Nav>
    );
  }


  return (

    <Navbar bg="dark" fixed="top" variant="dark" expand="lg" style={{ zIndex: 1 }}>
      <Container>
        <Link to="/" className="navbar-brand">Admin DashBoard</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

          </Nav>

          {
            auth.authenticate ? renderLoginHeaderLinks() : renderNonLoginHeaderLinks()

          }
        </Navbar.Collapse>
      </Container>

    </Navbar>


  )

}

export default Header;