import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBySlug } from '../../../actions/product.actions';
import { generatePublicUrl } from '../../../axios/urlConfig';
import { Link } from 'react-router-dom';


import './style.css';
import Card from '../../../components/UI/Card';

/**
* @author
* @function ProductStore
**/

const ProductStore = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const priceRange ={
      under5k: 5000,
      under10k: 10000,
      under15k: 15000,
      under20k: 20000,
      under25k : 25000,
      under30k : 30000
  
  
    }
  
    useEffect(() => {
      // we take only slug match from getState
      const { match } = props;
      dispatch(getProductBySlug(match.params.slug))
    }, [])
  return(
   <React.Fragment>
        {
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <Card
             headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
             headerRight={<button>view All</button>}
             style={{
            width:'calc(100% -20px)',
               margin:'20px'}}
            >
              
              <div  style={{display:'flex'}}>
                {
                  product.productsByPrice[key].map(product =>
                    <Link  to={`/${product.slug}/${product._id}/p`}
                    style={{display:'block'}}
                    className="productContainer">
                      <div className="productImgContainer">
                        <img src={generatePublicUrl(product.productPictures[0].img)}  alt="" />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: '5px 0' }}>{product.name} </div>
                        <div>
                          <span>4.5</span>&nbsp;
                          <span>3346</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                    </Link>
                  )
                }

              </div>

            </Card>
          );
        })
      }
   </React.Fragment>
   )

 }

export default ProductStore