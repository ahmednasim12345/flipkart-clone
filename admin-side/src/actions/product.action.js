import axios from "../axios"
import { productConstants } from "./constants";

export const  addProduct = (form) => {
    return async (dispatch) =>{
    dispatch({    type: productConstants.ADD_PRODUCT_REQUEST});
        const  res = await axios.post(`/product/create`,form);
        console.log(" response product ",res);

        // dispatch({
        //     type: productConstants.ADD_PRODUCT_SUCCESS,
        //     payload: {
        //         action.payload.
        //     }
        // })


    }
}