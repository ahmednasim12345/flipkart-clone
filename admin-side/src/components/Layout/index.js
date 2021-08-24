import React from 'react'
import { Col, Container,  Row } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Header from '../Header';
import "./style.css";

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <React.Fragment>
    <Header/>
    {/* now we need sidebar for only product page or order page */}
     {
       props.sidebar ?
       <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>
              <li>
                <NavLink to={`/`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`/page`}>Page</NavLink>
              </li>
              <li>
                <NavLink to={`/category`}>Category</NavLink>
              </li>
              <li>
                <NavLink to={`/product`}>Products</NavLink>
              </li>
              <li>
                <NavLink to={`/orders`}>Orders</NavLink>
              </li>
            </ul>
          </Col>
          <Col md={10} style={{ marginLeft: "auto" ,paddingTop:'60px' }}>
          {props.children}
          </Col>
        </Row>
      </Container>
      :
      props.children
     }
 </React.Fragment>
    
   )

 }

export default Layout;