import axios from "../axios";
import { productConstant } from "./constants";

export const getProductBySlug = (slug) =>{
    return async dispatch =>{
         dispatch({
             type:productConstant.GET_PRODUCT_BY_SLUG_REQUEST  })
        const res = await axios.get(`/products/${slug}`);
        // console.log(" product List", res);
        if(res.status === 200){
            dispatch({
                type: productConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload: res.data
            })
        }
    }
}

export const getProductPage = (payload) =>{
    return async dispatch =>{
        console.log("----->getProductPage action.... ", payload)
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log("response page",res);
            dispatch({ type: productConstant.GET_PRODUCT_BY_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstant.GET_PRODUCT_BY_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstant.GET_PRODUCT_BY_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

// GET PRODUCTDetails BY PRODUCT ID

export const getProductDetailsById = (payload) =>{
    return async dispatch =>{
        dispatch({ type: productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const {productId} = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);

            dispatch({
                type: productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: {productDetails: res.data.product }
            });

            
        } catch (error) {
            console.log(error);
            dispatch({
                type: productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}
