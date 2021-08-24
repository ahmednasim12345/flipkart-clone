import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch,useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import {registeration} from '../../actions/user.actions'
/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  
  const[email, setEmail] = useState("");
  const[password,setPassword] = useState("");
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  
  const userRegister = (e) =>{
    e.preventDefault();
    const user ={
      firstName,
      lastName,
   email,
   password
    }
    dispatch(registeration(user)).then(() => {history.push("/")});
  }

  // redirect 
  if(auth.authenticate){
    return <Redirect to={`/`}/>
  }

  if(user.loading){
    return <p>Loading.....!</p>
  }
  return (
    <Layout>
      <Container>
         {user.message}
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }} >
            <Form onSubmit= {userRegister}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    value={firstName}
                    placeholder="Enter first Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}

                  />
                </Col>
              </Row>
              <Input
                label="Email"
                type="email"
                placeholder="Enter email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter password "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Submit
  </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Signup;