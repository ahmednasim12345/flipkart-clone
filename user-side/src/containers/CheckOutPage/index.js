import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux'
import CartPage from '../CartPage/index'
import { addOrder, getAddress } from '../../actions/address.action';

import {

  MaterialButton, MaterialInput, Anchor
} from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import AddressForm from './AddressForm'
import './style.css'
import Card from '../../components/UI/Card';
/**
* @author
* @function 
**/


const Address = ({
  adr,
  selectAddress,
  enbleAddressEditForm,
  conformDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enbleAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => conformDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
};


const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div onClick={props.onClick} className={`checkoutHeader ${props.stepNumber && 'active'}`}>
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
}
const CheckOutPage = (props) => {

  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [confirmAddress, setConformAddress] = useState(false);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConformation, setOrderConformation] = useState(false);
  const [conformOrder, setConformOrder] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConformAddress(true);
    setOrderSummary(true);

  };

  const selectAddress = (addr) => {
    //  console.log("adr====>",addr);
    const updatedAddress = address.map(adr => adr._id === addr._id ?
      { ...adr, selected: true } : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };



  // ENABLE EDIT ADDRESS

  const enbleAddressEditForm = (addr) => {
    const updatedAddress = address.map(adr => adr._id === addr._id ?
      { ...adr, edit: true } : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  }

  const conformDeliveryAddress = (adr) => {
    setSelectedAddress(adr);
    setConformAddress(true);
    setOrderSummary(true);
  }

  // CONFORM ORDER
  const onConformOrder = () => {
    const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);
    const items = Object.keys(cart.cartItems).map(key =>
      ({ productId: key, 
        payablePrice: cart.cartItems[key].price,
       purchasedQty:cart.cartItems[key].qty }));

    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      items,
      paymentStatus: "pending",
     
    }
    console.log("payload ===>", payload)
    dispatch(addOrder(payload));
    setConformOrder(true);
  }


  // user ORDER CONFORMATION

  const userOrderConformation = () => {
    setOrderConformation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  }
  useEffect(() => {
    // console.log("\n\n\n------------################")
    auth.authenticate && dispatch(getAddress())
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map(adr => ({ ...adr, selected: false, edit: false }));
    setAddress(address);
  }, [user.address])



  // /
  if (conformOrder) {
    return (
      <Layout>
        <Card>
          <div> 
            <h1> <center>Your order is placed</center></h1>
            <h3><center>Your order detail is sent to your registered e-mail Id...</center></h3>

            </div>
        </Card>
      </Layout>
    )
  }


  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enbleAddressEditForm={enbleAddressEditForm}
                      conformDeliveryAddress={conformDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}


          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConformation ? (
                <div className="stepCompleted">{Object.keys(cart.cartItems).length} items</div>
              ) : null
            }
          />
          {
            orderSummary && (
              <Card style={{
                margin: '10px 0'
              }}>
                <div className="flexRow sb"
                  style={{
                    padding: "20px",
                    alignItems: 'center'
                  }}>
                  <p style={{ fontSize: '12px' }}>Order conformation email will be sent to <strong> {auth.user.email}</strong> </p>
                  <MaterialButton
                    title="CONTINUE"
                    onClick={userOrderConformation}
                    style={{
                      width: '200px'
                    }}
                  />
                </div>
              </Card>
            )
          }

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div className="stepCompleted">
                  <div className="flexRow" style={{
                    alignItems: "center",
                    padding: "20px"

                  }}>
                    <input type="radio" name="paymentOption"
                      value="cod" id="cashOnDeliveryRadio"/>
                    <label htmlFor="cashOnDeliveryRadio">Cash on delivery</label>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConformOrder}
                    style={{
                      width: '200px',
                      margin: "0 0 20px 20px"
                    }}
                  />
                </div>
              )
            }
          />

        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};


export default CheckOutPage;
