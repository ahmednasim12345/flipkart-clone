import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addToCart, } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux';
import {

  MaterialButton
} from '../../components/MaterialUI';
import './style.css'
import PriceDetails from '../../components/PriceDetails';

/**
* @author
* @function CartPage
**/

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const cartItems = cart.cartItems;
  useEffect(() => {
    if (auth.authenticate) {
      // dispatch(getCartItems());
    }
  }, [auth.authenticate])




  // change in quantity
  const onQuantityIncrement = (_id, qty) => {
    console.log(_id, qty);
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  }

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));

  }

  if(props.onlyCartItems){
    return (
      <>
      { Object.keys(cartItems).map((key, index) =>(
        <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />
      ))}
      </>
    );
  }
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
        > {
            // json object give us key 
            Object.keys(cartItems).map((key, index) =>
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
              />

            )
          }

          <div style={{
            width: '100%',
            display: 'flex',
            background: '#ffffff',
            justifyContent: 'flex-end',
            boxShadow: '0 0 10px 10px #eee',
            padding: '10px 0',
            boxSizing: 'border-box'

          }}>
            <div style={{ width: '250px' }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push('/checkout')}
              />

            </div>
          </div>
        </Card>
        {/* <Card
          headerLeft="Price"
          style={{ width: '380px' }}>

        </Card> */}

        <PriceDetails
          totalItem={Object.keys(cart.cartItems)
            .reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;

            }, 0)}
          totalPrice={Object.keys(cart.cartItems)
            .reduce(function (totalPrice, key) {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;

            }, 0)}
        />

      </div>
    </Layout>
  )

}

export default CartPage