import React from 'react'
import { Form } from 'react-bootstrap'

/**
* @author
* @function Input
**/

const Input = (props) => {
  return(
    <Form>
        <Form.Group >
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
           value={props.value}
           type={props.type}
            placeholder={props.placeholder}
    
            onChange={props.onChange}
            />
          <Form.Text className="text-muted">
            {props.errorMsg}
    </Form.Text>
        </Form.Group>
       </Form>
   )

 }

export default Input