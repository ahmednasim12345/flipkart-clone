import React, { useState } from 'react'
import { generatePublicUrl } from '../../../axios/urlConfig';
import './style.css'
/**
* @author
* @function CartItems
**/

const CartItem = (props) => {
  const [qty, setQty] =  useState(props.cartItem.qty);

  const {_id,name, price, img} = props.cartItem;

  

  // onQuantity Increment
  const onQuantityIncrement = () => {
    setQty(qty + 1);
   props.onQuantityInc(_id,qty+1);
  }
  // onQuantity Decrement
  const onQuantityDecrement = () => {
    if(qty <= 1)
    return;
    setQty(qty - 1);
    props.onQuantityDec(_id,qty - 1);
  }
  return(
  
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img) } alt={''}/>

        </div>
        <div className="cartItemDetails">
            <div>
              <p>{name}</p>
              <p>RS, {price}</p>
            </div>
            <div>Delivery in 3 -5 days</div>
        </div>
      </div>
      <div
      style={{
        display:'flex',
        margin:'5px 0'
      }}>
    
    <div className="quantityControl">
      <button onClick={onQuantityDecrement}>-</button>
      <input value={qty} readOnly />
      <button onClick={onQuantityIncrement}>+</button>

    </div>

    {/* <button className="cartActionBtn">save for later</button>
    <button className="cartActionBtn">Remove</button> */}
      </div>

    </div>
   )

 }

export default CartItem;