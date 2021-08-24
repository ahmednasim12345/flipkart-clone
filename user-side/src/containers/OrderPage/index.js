import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions';
import { generatePublicUrl } from '../../axios/urlConfig';
import Layout from '../../components/Layout'
import { Breed } from '../../components/MaterialUI';
import Card from '../../components/UI/Card';
import './style.css'
import { IoIosArrowForward } from 'react-icons/io';
import { BiRupee } from "react-icons/bi";


/**
* @author
* @function 
**/

const OrderPage  = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    useEffect(() =>{
        dispatch(getOrder());
    },[])
  console.log("user>>>>===>",user);
  return(
   <Layout>
    <div style={{ maxWidth:"1160px", margin:"5px auto"}}>
    <Breed
      breed = {[
          {name:'Home', href:"/"},
          {name:"My Account",href:"/account"},
          {name:"My Orders",href:"/account/orders"},
      ]}
      breedIcon={<IoIosArrowForward/>}
    />
    </div>

       {
      user.orders.map(order => {
           return order.items.map(item =>
                <Card style={{margin:"5px auto"}}>
        <div className="orderItemContainer"> 
           <div className="orderImgContainer">
            <img className="orderImg"  src={generatePublicUrl(item.productId.productPictures[0].img)} 
              />
              </div>
              <div className="orderRow">
                <div className="orderName">{item.productId.name}</div>
               <div className="orderPrice">
                  <BiRupee/>
                  {item.payablePrice}
               </div>
                <div>{order.paymentStatus}</div>
              </div>
        </div>
   </Card>
                )
        })   
       }
       
   </Layout>
   )

 }

export default OrderPage