import axios from "../axios"
import { categoryConstants, initalDataConstant, productConstants } from "./constants"

export const getInitialData = () =>{
    return async (dispatch) =>{
       
        const res = await axios.post(`/initialdata`);
        console.log("res==>", res);
        const {categories,products} = res.data;
        if(res.status === 200){
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload:{
                    categories,
                
                }
            })
           dispatch({
               type: productConstants.GET_ALL_PRODUCT_SUCCESS,
               payload: {
                   products
               }
           })

        }
        console.log("response " , res);
    }
}